import { useEffect } from 'react';
import './FadeOut.scss'

export const fadeOut = () => {
  useEffect(() => {
    window.scrollTo(0, 1)
  }, [])
  window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fadeOut');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const topPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      // console.log('topPos', topPosition, i);
      // console.log('windowH', windowHeight, i);

      if (topPosition <= windowHeight) {
        element.classList.add('animate');
      }
    }
  });
  window.scrollTo(0, 2)
};
