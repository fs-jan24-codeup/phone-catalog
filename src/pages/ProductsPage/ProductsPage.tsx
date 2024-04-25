import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Product } from '../../types/Product';
import { CardLayout } from '../../components/CardLayout';
import { Pagination } from '../../components/Pagination';
import { ItemsLayout } from '../../components/ItemsLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductsPage.scss';
import { Sort } from '../../types/Sort';
import { QuantitySkeleton } from './QuantitySkeleton';

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
    return Number(params.get('itemsPerPage')) || 4;
  });

  const [isLoadingTitle, setIsLoadingTitle] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('itemsPerPage', itemsPerPage.toString());

    if (sortBy !== Sort.Newest) {
      params.set('sortBy', sortBy);
    } else {
      params.delete('sortBy');
    }

    if (sortBy === Sort.Newest) {
      params.set('sortBy', 'newest');
    }

    navigate(`${location.pathname}?${params.toString()}`);
  }, [sortBy, itemsPerPage, navigate, location.pathname]);

  const [currentPage, setCurrentPage] = useState(1);

  const sortProducts = (phones: Product[]) => {
    switch (sortBy) {
      case Sort.Alphabetically:
        return [...phones].sort((a, b) => a.name.localeCompare(b.name));
      case Sort.PriceLow:
        return [...phones].sort((a, b) => a.priceDiscount - b.priceDiscount);
      case Sort.PriceHigh:
        return [...phones].sort((a, b) => b.priceDiscount - a.priceDiscount);
      case Sort.Newest:
      default:
        return [...phones];
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingTitle(false);
    }, 500);
  }, []);

  return (
    <div className="product-page">
      <Breadcrumb />
      <h1 className="product-page__header">{title}</h1>
      {isLoadingTitle ? (
        <QuantitySkeleton />
      ) : (
        <p className="product-page__quantity">{products.length} models</p>
      )}

      <div className="product-page__filters">
        <div className="product-page__filter product-page__filter--sort">
          <label className="select-label">Sort by</label>
          <select
            className="select"
            value={sortBy}
            onChange={event => {
              const selectedSort = event.target.value as Sort;
              setSortBy(selectedSort === 'newest' ? Sort.Newest : selectedSort);
            }}
          >
            <option value={Sort.Newest}>Newest</option>
            <option value={Sort.Alphabetically}>Alphabetically</option>
            <option value={Sort.PriceLow}>Price low</option>
            <option value={Sort.PriceHigh}>Price high</option>
          </select>
        </div>

        <div className="product-page__filter product-page__filter--items">
          <label className="select-label">Items on page</label>
          <select
            className="select"
            value={itemsPerPage}
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value={products.length}>All</option>
          </select>
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
