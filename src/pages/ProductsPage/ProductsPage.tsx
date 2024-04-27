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

import { DropdownSort } from '../../components/Dropdown/DropdownSort';
import { DropdownAmount } from '../../components/Dropdown/DropdownAmount';
import { useTranslation } from 'react-i18next';
import { fadeOut } from '../../components/FadeOut/FadeOut';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsPage: React.FC<Props> = ({ title, products }) => {
  fadeOut();
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

  const [isLoadingTitle, setIsLoadingTitle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    params.set('page', currentPage.toString());

    if (sortBy !== Sort.Newest) {
      params.set('sortBy', sortBy);
    } else {
      params.delete('sortBy');
    }

    if (sortBy === Sort.Newest) {
      params.set('sortBy', 'Newest');
    }

    navigate(`${location.pathname}?${params.toString()}`);
  }, [currentPage, sortBy, navigate, location.pathname]);

  useEffect(() => {
    params.set('page', '1');
    params.set('itemsPerPage', itemsPerPage.toString());

    setCurrentPage(1);

    navigate(`${location.pathname}?${params.toString()}`);
  }, [itemsPerPage]);

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingTitle(false);
    }, 700);
  }, []);

  return (
    <div className="product-page fadeOut">
      <Breadcrumb />
      <h1 className="product-page__header">{title}</h1>
      {isLoadingTitle ? (
        <QuantitySkeleton />
      ) : (
        <p className="product-page__quantity">
          {products.length} {t('models')}
        </p>
      )}

      <div className="product-page__filters">
        <div className="product-page__filter product-page__filter--sort">
          <label className="select-label">{t('sortBy')}</label>
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
          <label className="select-label">{t('itemsOnPage')}</label>
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
