import './ProductPageSkeleton.scss';

export const SkeletonTitle: React.FC = () => {
  return <div className="product__title skeleton__product-title"></div>;
};

export const SkeletonImages: React.FC = () => {
  return (
    <div className="skeleton__product-images">
      <div className="skeleton__product-image"></div>
      <div className="skeleton__product-slider">
        <div className="skeleton__product-mini"></div>
        <div className="skeleton__product-mini"></div>
        <div className="skeleton__product-mini"></div>
        <div className="skeleton__product-mini"></div>
        <div className="skeleton__product-mini"></div>
      </div>
    </div>
  )
}

export const SkeletonPrice: React.FC = () => {
  return (
    <div className="skeleton__product-price-block">
      <div className="skeleton__product-colors-block">
        <div className="skeleton__product-color-title-id">
          <div className="skeleton__product-color-title"></div>
          <div className="skeleton__product-color-id"></div>
        </div>
        <div className="skeleton__product-colors">
          <div className="skeleton__product-color"></div>
          <div className="skeleton__product-color"></div>
          <div className="skeleton__product-color"></div>
          <div className="skeleton__product-color"></div>
          <div className="skeleton__product-color"></div>
        </div>
      </div>

      <div className="skeleton__product-capacity">
        <div className="skeleton__product-capacity-title"></div>
        <div className="skeleton__product-capacity-block">
          <div className="skeleton__product-capacity-btn"></div>
          <div className="skeleton__product-capacity-btn"></div>
          <div className="skeleton__product-capacity-btn"></div>
          <div className="skeleton__product-capacity-btn"></div>
        </div>
      </div>
      <div className="skeleton__product-price"></div>
      <div className="skeleton__product-btn"></div>
      <div className="skeleton__product-desc-block">
        <div className="skeleton__product-desc"></div>
        <div className="skeleton__product-desc"></div>
        <div className="skeleton__product-desc"></div>
        <div className="skeleton__product-desc"></div>
      </div>
    </div>
  )
}

export const SkeletonAbout: React.FC = () => {
  return (
    <div className="skeleton__product-about">
      <div className="skeleton__product-about-first-title"></div>
      <div className="skeleton__product-about-title"></div>

      <div className="skeleton__product-about-block">
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
      </div>

      <div className="skeleton__product-about-title"></div>

      <div className="skeleton__product-about-block">
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
      </div>

      <div className="skeleton__product-about-title"></div>

      <div className="skeleton__product-about-block">
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
        <div className="skeleton__product-about-desc"></div>
      </div>
    </div>
  )
}
