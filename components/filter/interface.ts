import { Dispatch, SetStateAction } from "react";
import { DataCategories } from "../../utils/interface/homePage";

export interface FilterProductsProps {
    categories: DataCategories[];
    onChange:Dispatch<SetStateAction<Filter>>;
}

export interface Filter {
    text?: string;
    min?: number;
    max?: number;
    categories?: string[];
    availability?: boolean;
  }

  