import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";

import { Filter, FilterProductsProps } from "./interface";
import style from "./style.module.css";

const FilterProducts = (props: FilterProductsProps) => {
  const { categories, onChange } = props;

  const [titleFilter, setTitleFilter] = useState("");
  const [isAvailability, setIsAvailability] = useState(true);
  const [isPriceFilter, setIsPriceFilter] = useState(false);
  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(0);
  const [isCategoriesFilter, setIsCategoriesFilter] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<any>({});

  useEffect(() => {
    let newFilter: Filter = {
      text: titleFilter,
      availability: isAvailability,
      min: minFilter,
      max: maxFilter,
      categories: [],
    };
    if (!titleFilter) delete newFilter.text;
    if (minFilter > maxFilter) {
      newFilter.max = newFilter.min;
      setMaxFilter(minFilter);
    }
    if (!isPriceFilter) {
      delete newFilter.min;
      delete newFilter.max;
    }
    // if (!isCategoriesFilter) delete newFilter.categories;

    for (const property in categoriesFilter) {
      if (categoriesFilter[property]) {
        newFilter.categories?.push(property);
      }
    }

    onChange(newFilter);
  }, [
    titleFilter,
    isAvailability,
    isPriceFilter,
    minFilter,
    maxFilter,
    isCategoriesFilter,
    categoriesFilter,
  ]);

  const onChangeCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    let newCategoriesFilter = { ...categoriesFilter };
    newCategoriesFilter[name] = checked;
    setCategoriesFilter(newCategoriesFilter);
  };

  return (
    <form className={style.form}>
      <label className={style.labelText} htmlFor="texto">
        <input
          type="text"
          id="texto"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className={style.inputText}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="var(--primary)"
          width="20px"
          height="20px"
        />
      </label>
      <div>
        <input
          className={style.checkbox}
          type="checkbox"
          name="availability"
          id="availability"
          checked={isAvailability}
          onChange={(e) => setIsAvailability(e.target.checked)}
        />
        <label className={style.labelCheckbox} htmlFor={"availability"}>
          Disponibles
        </label>
      </div>
      <div className={style.row}>
        {isPriceFilter && (
          <div className={style.containerPrice}>
            <input
              className={style.inputNumber}
              type="number"
              id="min"
              min={0}
              value={minFilter}
              onChange={(e) => setMinFilter(parseInt(e.target.value))}
            />
            <FontAwesomeIcon
              icon={faArrowsLeftRight}
              width="20px"
              height="20px"
            />
            <input
              className={style.inputNumber}
              type="number"
              id="max"
              min={0}
              value={maxFilter}
              onChange={(e) => setMaxFilter(parseInt(e.target.value))}
            />
          </div>
        )}
      </div>
      <div>
        <input
          className={style.checkbox}
          type="checkbox"
          name="range"
          id="range"
          checked={isPriceFilter}
          onChange={(e) => setIsPriceFilter(e.target.checked)}
        />
        <label className={style.labelCheckbox} htmlFor={"range"}>
          Rango de Precio
        </label>
      </div>

      <div className={style.categoriesContainer}>
        {categories.map((c, i) => (
          <>
            <input
              className={style.checkbox}
              type="checkbox"
              name={c.data.title}
              id={`checkbox-${c.data.title}`}
              value={c.data.title}
              checked={categoriesFilter.checked}
              onChange={onChangeCategories}
            />
            <label
              className={style.labelCheckbox}
              key={i}
              htmlFor={`checkbox-${c.data.title}`}
            >
              {c.data.title}
            </label>
          </>
        ))}
      </div>
    </form>
  );
};

export default FilterProducts;
