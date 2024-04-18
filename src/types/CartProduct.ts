import { Phone } from "./Phone";

export type CartProduct = Pick<Phone, 'id' | 'name'> & {
  image: string;
  price: number;
};
