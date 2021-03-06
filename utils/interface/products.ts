import { Data } from "./homePage";

export interface Product {
  title: string;
  imagen: string;
  categories: any;
  price: number;
  availability: boolean;
  description: string;
}


export interface Params {
  params: {slug: string}
}

export interface ProductProps {
  data: Product;    
  slug: string;
}