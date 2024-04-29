import { useEffect } from 'react';
import './FadeOut.scss'

export const fadeOut = () => {
  useEffect(() => {
    window.scrollTo({
      top: 2,
      left: 0,
      behavior: "smooth",
    });
  }, [])
  window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fadeOut');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const topPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (topPosition <= windowHeight) {
        element.classList.add('animate');
      }
    }
  });
};
