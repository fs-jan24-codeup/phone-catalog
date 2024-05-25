import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

// import { fetchAllProducts } from '../../utils/fetchAllProducts';
import { filterProducts } from '../../utils/filterProducts';
import useOutsideClick from '../../hooks/useOutsideClick';

import { Product } from '../../types/Product';

import SearchIcon from '../../assets/icons/search.svg?react';
import Close from '../../assets/icons/close.svg?react';
import './Search.scss';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../hooks/useAppContext';
import { apiRequest } from '../../utils/fetchData';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isResultsShown, setIsResultsShown] = useState(false);
  const { setIsSearchOpen } = useAppContext();

  const { t } = useTranslation();

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setIsResultsShown(false);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await apiRequest(`/products?perPage=200`);
        setProducts(allProducts);
      } catch (error: any) {
        throw error(error.message);
      }
    };

    fetchData();
  }, []);

  const debouncedSearch = debounce(() => {
    setIsResultsShown(true);
  }, 1000);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsResultsShown(false);
    debouncedSearch();
  };

  const handleRedirect = () => {
    setIsResultsShown(false);
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleReset = () => {
    setQuery('');
  };

  const filteredProducts = filterProducts(query, products);
  const isAnyResults = query && isResultsShown;
  const isNoResults = query && filteredProducts.length < 1 && isResultsShown;

  return (
    <div className="search" ref={ref}>
      <div className="input-wrapper">
        <input
          className="search__input"
          value={query}
          placeholder={t('searchForProduct')}
          onChange={handleSearch}
          onFocus={() => setIsResultsShown(filteredProducts.length > 1)}
        />
        {query ? (
          <button className="search__input-icon" onClick={handleReset}>
            <Close />
          </button>
        ) : (
          <span className="search__input-icon">
            <SearchIcon />
          </span>
        )}
      </div>
      {isAnyResults && (
        <ul className="search__results">
          {filteredProducts.map(product => (
            <li key={product.id}>
              <Link
                to={`/${product.category}/${product.id}`}
                className="search__product"
                onClick={handleRedirect}
              >
                <img
                  src={product.images[0]}
                  className="search__product-image"
                />
                <span>{product.name}</span>
              </Link>
            </li>
          ))}
          {isNoResults && (
            <li className="search__product">
              <span>No results found</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
