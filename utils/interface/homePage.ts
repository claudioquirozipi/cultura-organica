import { Product } from "./products";

export interface Data {
    data: Product;
    slug: string;
}

export interface HomeProps {
    products: Data[];    
}