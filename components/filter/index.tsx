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
      newFilter.min = newFilter.max;
      setMinFilter(maxFilter);
    }
    if (!isPriceFilter) {
      delete newFilter.min;
      delete newFilter.max;
    }
    if (!isCategoriesFilter) delete newFilter.categories;

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
      <div className={style.row}>
        <label className={style.label} htmlFor="texto">
          Buscar por:
        </label>
        <input
          type="text"
          id="texto"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>
      <div className={style.row}>
        <label className={style.label} htmlFor={"availability"}>
          <input
            className={style.checkbox}
            type="checkbox"
            name="availability"
            id="availability"
            checked={isAvailability}
            onChange={(e) => setIsAvailability(e.target.checked)}
          />
          Disponibles
        </label>
      </div>
      <div className={style.row}>
        <label className={style.label} htmlFor={"range"}>
          <input
            className={style.checkbox}
            type="checkbox"
            name="range"
            id="range"
            checked={isPriceFilter}
            onChange={(e) => setIsPriceFilter(e.target.checked)}
          />
          Rango de Precio
        </label>
        {isPriceFilter && (
          <div className={style.containerPrice}>
            <label className={style.label} htmlFor="min">
              Minimo:
            </label>
            <input
              className={style.inputNumber}
              type="number"
              id="min"
              min={0}
              value={minFilter}
              onChange={(e) => setMinFilter(parseInt(e.target.value))}
            />
            <label className={style.label} htmlFor="max">
              Máximo:
            </label>
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

      <div className={style.row}>
        <label className={style.label} htmlFor={"categories"}>
          <input
            className={style.checkbox}
            type="checkbox"
            name="categories"
            id="categories"
            checked={isCategoriesFilter}
            onChange={(e) => setIsCategoriesFilter(e.target.checked)}
          />
          Categorías
        </label>
        {isCategoriesFilter && (
          <>
            {categories.map((c, i) => (
              <label
                className={style.label}
                key={i}
                htmlFor={`checkbox-${c.data.title}`}
              >
                <input
                  className={style.checkbox}
                  type="checkbox"
                  name={c.data.title}
                  id={`checkbox-${c.data.title}`}
                  value={c.data.title}
                  checked={categoriesFilter.checked}
                  onChange={onChangeCategories}
                />
                {c.data.title}
              </label>
            ))}
          </>
        )}
      </div>
    </form>
  );
};

export default FilterProducts;
