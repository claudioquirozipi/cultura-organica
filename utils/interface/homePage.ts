import { Product } from "./products";

export interface Data {
    data: Product;
    slug: string;
}

export interface HomeProps {
    products: Data[];    
    categories: DataCategories[], 
}

 export interface DataCategories {
    data: Categories;
    slug: string;
}
interface Categories {
    title: string
}