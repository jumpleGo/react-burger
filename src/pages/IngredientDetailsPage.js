import IngredientDetails from "../components/Modal/IngredientDetails";
import IngredientDetailsPageStyles from "../styles/pages/IngredientDetailsPage.module.css";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBun, getIngredientById } from "../services/getters/store";
import { useSelector } from "react-redux";
function IngredientDetailsPage() {
  const { id } = useParams();
  const [itemIsLoading, setIsLoading] = useState(true);

  const item = useSelector((state) => getIngredientById(state, id));
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
}

export default IngredientDetailsPage;
