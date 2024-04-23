// import classNames from 'classnames';
// import React from 'react';

// type Props = {
//   image: string;
//   index: number;
//   setIndex: (value: number) => void;
//   swiper: any;
// };

// export const OtherImages: React.FC<Props> = ({
//   image,
//   index,
//   setIndex,
//   swiper,
// }) => {
//   const handleSelect = () => {
//     if (image) {
//       const imageIndex = image.split('/').pop()?.slice(1, 2) || '';

//       setIndex(+imageIndex);
//       swiper.slideTo(imageIndex)
//     }
//   };

//   const wrapperClassNames = classNames('other-images--wrapper', {
//     active: image
//       .split('/')
//       .pop()
//       ?.slice(1, 2)
//       .includes('' + index),
//   });

//   return (
//     <div className={wrapperClassNames}>
//       <img
//         src={image}
//         className="other-images--all"
//         onClick={handleSelect}
//       />
//     </div>
//   );
// };
