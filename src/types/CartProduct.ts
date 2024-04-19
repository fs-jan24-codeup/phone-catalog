import { Phone } from "./Phone";

export type CartProduct = Pick<Phone, 'id' | 'name' | 'priceRegular' | 'priceDiscount'> & {
  image: string;
  price: number;
  quantity: number;
  id: number;
};
