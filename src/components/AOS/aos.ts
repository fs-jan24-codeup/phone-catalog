import AOS from 'aos';
import 'aos/dist/aos.css';

export const aos: any = () => AOS.init({
  duration: 1000,
});