import classNames from "classnames";

export const getHeaderIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar__icon', { 'navbar__link--active': isActive });
