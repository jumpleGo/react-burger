import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { getIngredientById } from "../services/getters/store";
import IngredientDetails from "../components/Modal/IngredientDetails";
import IngredientDetailsPageStyles from "../styles/pages/IngredientDetailsPage.module.css";

interface IngredientDetailsPageProps {}

const IngredientDetailsPage: React.FC<IngredientDetailsPageProps> = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type of 'id' as string
  const [itemIsLoading, setIsLoading] = useState<boolean>(true); // Specify the type of 'itemIsLoading' as boolean

  const item = useSelector((state: any) => getIngredientById(state, id)); // Specify RootState type
  const location = useLocation();

  useEffect(() => {
    if (item) {
      setIsLoading(false);
    }
  }, [item]);

  return (
    <div className={IngredientDetailsPageStyles.wrapper}>
      {!itemIsLoading ? (
        <div className={"pt-30"}>
          <h1 className={"text_type_main-large"}>Детали ингредиента</h1>
          <IngredientDetails ingredient={item} />
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default IngredientDetailsPage;
