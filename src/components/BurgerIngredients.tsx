import React, {
  FC,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { translateTabs } from "../helpers/transcriptions";
import { addModalIngredient } from "../services/actions/store";
import { getIngredientById } from "../services/getters/store";
import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";
import BurgerIngredientItem from "./BurgerIngredientItem";
import BurgerIngredientsStyles from "../styles/BurgerIngredients.module.css";
import { RootState } from "../services/store";

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const burgerIngredients = useSelector(
    (state: RootState) => state.storeReducer.burgerIngredients,
  );
  const ingredients = useSelector(
    (state: RootState) => state.storeReducer.ingredients,
  );

  const [state, setState] = useState<any>({
    ingredientsByType: [],
    listItemsTemplate: [],
  });

  const [tabs, setTabs] = useState<React.ReactNode[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<{
    [key: string]: IBurgerIngredientItem[];
  }>({});
  const [activeType, setActiveType] = useState("bun");
  const typeRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const navigate = useNavigate();

  const updateTypeRef = useCallback((type: string, element: HTMLDivElement) => {
    typeRefs.current[type] = element;
  }, []);

  useEffect(() => {
    if (!Object.keys(sortedIngredients).length) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let maxVisibleRatio = 0;
      let maxVisibleType: null | string = null;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxVisibleRatio) {
          maxVisibleRatio = entry.intersectionRatio;
          maxVisibleType = entry.target.id;
        }
      });

      if (!maxVisibleType) return;

      setActiveType(maxVisibleType);
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    Object.values(typeRefs.current).forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [sortedIngredients]);

  useEffect(() => {
    const tabs: ReactNode[] = Object.keys(sortedIngredients).map(
      (type: string) => {
        const name = translateTabs[type] as string;
        return (
          <Tab
            active={activeType === type}
            value={type}
            key={type}
            onClick={() => {}}
          >
            {name}
          </Tab>
        );
      },
    );
    setTabs(tabs);
  }, [activeType, sortedIngredients]);

  useEffect(() => {
    if (!ingredients.length) return;

    const sortedData = ingredients.reduce(
      (
        acc: Record<string, IBurgerIngredientItem[]>,
        item: IBurgerIngredientItem,
      ) => {
        if (acc[item.type]) acc[item.type].push(item);
        else acc[item.type] = [item];
        return acc;
      },
      {},
    );

    setSortedIngredients(sortedData);

    const template = Object.entries(sortedData).map(([type, items]) => (
      <div
        className={`${BurgerIngredientsStyles.burgerIngredients} mt-10`}
        key={type}
        ref={(element) => element && updateTypeRef(type, element)}
        id={type}
      >
        <h2
          className={`text text_type_main-medium ${BurgerIngredientsStyles.title} mb-6`}
        >
          {translateTabs[type]}
        </h2>
        <div className={`${BurgerIngredientsStyles.list} pl-1 pr-1`}>
          {(items as IBurgerIngredientItem[]).map((item) => (
            <div className="mb-8">
              <BurgerIngredientItem
                ingredientItem={item}
                key={`ingredient-item-${type}-${item._id}`}
                count={getCountById(item._id)}
                onClick={() => openModalIngredient(item)}
              />
            </div>
          ))}
        </div>
      </div>
    ));

    setState({
      ingredientsByType: sortedData,
      selectedType: Object.keys(sortedData)[0],
      listItemsTemplate: template,
    });
  }, [ingredients, activeType, burgerIngredients]);

  const openModalIngredient = (content: IBurgerIngredientItem) => {
    dispatch(
      addModalIngredient({
        content,
        type: "ingredient",
        classes: "pt-10 pl-10 pr-10 pb-15",
      }),
    );
    navigate(`/ingredients/${content._id}`, {
      state: { backgroundLocation: location, id: content._id },
    });
  };

  const getCountById = (id: string) => {
    return burgerIngredients.filter(
      (item: IBurgerIngredientItem) => item._id === id,
    ).length;
  };

  return (
    <div>
      <h1
        className={`text text_type_main-large pt-10 ${BurgerIngredientsStyles.title}`}
      >
        Соберите бургер
      </h1>
      <div className={BurgerIngredientsStyles.tabs}>{tabs}</div>
      <div className={BurgerIngredientsStyles.wrapper} id={"wrapper"}>
        {state.listItemsTemplate}
      </div>
    </div>
  );
};

export default BurgerIngredients;
