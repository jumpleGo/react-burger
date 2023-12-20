import React, { useEffect, useState } from "react";
import { useSelector } from "../services/store";
import { useLocation, useParams } from "react-router-dom";

import { getIngredientById } from "../services/getters/store";
import IngredientDetails from "../components/Modal/IngredientDetails";
import IngredientDetailsPageStyles from "../styles/pages/IngredientDetailsPage.module.css";
import { RootState } from "../services/store";

interface IngredientDetailsPageProps {}

const IngredientDetailsPage: React.FC<IngredientDetailsPageProps> = () => {
  const params = useParams<{ number: string }>();

  const [itemIsLoading, setIsLoading] = useState<boolean>(true);

  const item = useSelector((state: RootState) =>
    getIngredientById(state, params.number),
  );
  const location = useLocation();

  useEffect(() => {
    if (item) {
      setIsLoading(false);
    }
  }, [item]);

  return (
    <div className={IngredientDetailsPageStyles.wrapper}>
      {!itemIsLoading && item ? (
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
