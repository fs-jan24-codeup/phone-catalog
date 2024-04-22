import classNames from "classnames";

export const getHeaderLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar__link', { 'navbar__link--active': isActive });