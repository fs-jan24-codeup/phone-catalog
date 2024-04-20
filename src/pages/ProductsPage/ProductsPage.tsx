import React, { useState } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Product } from '../../types/Product';
import { CardLayout } from '../../components/CardLayout';
import { Sort } from '../../types/Sort';

import './ProductsPage.scss';
import { Pagination } from '../../components/Pagination';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsPage: React.FC<Props> = ({ products, title }) => {
  const [sortBy, setSortBy] = useState(Sort.Default);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const sortProducts = (phones: Product[]) => {
    return [...phones].sort((a, b) => {
      switch (sortBy) {
        case Sort.Alphabetically:
          return a.name.localeCompare(b.name);
        case Sort.PriceLow:
          return a.priceDiscount - b.priceDiscount;
        case Sort.PriceHigh:
          return b.priceDiscount - a.priceDiscount;
        default:
          return 0;
      }
    });
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
          <select
            className="select"
            value={sortBy}
            onChange={event => setSortBy(event.target.value as Sort)}
          >
            <option value={Sort.Default}>Newest</option>
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

      <ul>
        {currentItems.map(product => (
          <CardLayout good={product} key={product.id} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
