export const isLoggedIn = (): boolean => {
  const loggedIn = localStorage.getItem('userData');
  return !!loggedIn;
};
