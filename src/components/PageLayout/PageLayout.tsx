import './PageLayout.scss';

export const PageLayout = () => {
  return (
    <div className="grid_container">
      <div className="header header--lg " style={{ backgroundColor: 'green' }}>
        header
      </div>
      <div className="main" style={{ backgroundColor: 'lightgrey' }}>
        <div className="container" style={{ backgroundColor: 'darkorange' }}>
          Main content
        </div>
      </div>
      <div className="footer footer--lg " style={{ backgroundColor: 'blue' }}>
        Footer
      </div>
    </div>
  );
};
