import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Product } from '../../types/Product';
import { CardLayout } from '../../components/CardLayout';
import { Pagination } from '../../components/Pagination';
import { ItemsLayout } from '../../components/ItemsLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductsPage.scss';
import { Sort } from '../../types/Sort';
import { DropdownSort } from '../../components/Dropdown/DropdownSort';
import { DropdownAmount } from '../../components/Dropdown/DropdownAmount';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsPage: React.FC<Props> = ({ title, products }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sortBy, setSortBy] = useState<Sort>(() => {
    const params = new URLSearchParams(location.search);
    const sortByParam = params.get('sortBy');
    return sortByParam ? (sortByParam as Sort) : Sort.Newest;
  });

  const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
    const params = new URLSearchParams(location.search);
    const itemsPerPageParam = params.get('itemsPerPage');
    return itemsPerPageParam ? parseInt(itemsPerPageParam) : 4;
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', currentPage.toString());
    params.set('itemsPerPage', itemsPerPage.toString());

    if (sortBy !== Sort.Newest) {
      params.set('sortBy', sortBy);
    } else {
      params.delete('sortBy');
    }

    if (sortBy === Sort.Newest) {
      params.set('sortBy', 'Newest');
    }

    navigate(`${location.pathname}?${params.toString()}`);
  }, [currentPage, sortBy, itemsPerPage, navigate, location.pathname]);

  const sortProducts = (products: Product[]) => {
    switch (sortBy) {
      case Sort.Alphabetically:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case Sort.PriceLow:
        return [...products].sort((a, b) => a.priceDiscount - b.priceDiscount);
      case Sort.PriceHigh:
        return [...products].sort((a, b) => b.priceDiscount - a.priceDiscount);
      case Sort.Newest:
      default:
        return [...products];
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortProducts(products).slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="product-page">
      <Breadcrumb />
      <h1 className="product-page__header">{title}</h1>
      <p className="product-page__quantity">{products.length} models</p>

      <div className="product-page__filters">
        <div className="product-page__filter product-page__filter--sort">
          <label className="select-label">Sort by</label>
          <DropdownSort
            value={sortBy}
            onChange={(selectedSort: Sort) => setSortBy(selectedSort)}
            options={[
              Sort.Newest,
              Sort.Alphabetically,
              Sort.PriceLow,
              Sort.PriceHigh,
            ]}
          />
        </div>

        <div className="product-page__filter product-page__filter--items">
          <label className="select-label">Items on page</label>
          <DropdownAmount
            value={itemsPerPage}
            onChange={(selectedItemsPerPage: number) =>
              setItemsPerPage(selectedItemsPerPage)
            }
            options={[4, 8, 16, products.length]}
          />
        </div>
      </div>

      <ItemsLayout>
        {currentItems.map(product => (
          <CardLayout good={product} key={product.id} />
        ))}
      </ItemsLayout>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
