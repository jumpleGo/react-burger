import React, {useEffect} from 'react';
import AppStyles from '../../styles/App/App.module.css';
import AppHeader from './AppHeader'
import AppContent from "./AppContent";
import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";
import OrderDetails from "../Modal/OrderDetails"
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";
import {fetchData} from "../../api/burgerApi";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients} from "../../services/actions/store";
import {useDispatch, useSelector} from "react-redux";



function App() {
    const dispatch = useDispatch()
    const { isOpen, modalData } = useSelector(store => {
        return {
            isOpen: store.modalReducer.isOpen,
            modalData: store.storeReducer.currentIngredient.content ?  store.storeReducer.currentIngredient : store.storeReducer.order
        }
    })

  useEffect( () => {
      dispatch(getIngredients())
  }, [])

  const element = document.getElementById("modal-root")
  return (
    <div className={`${AppStyles.App}`}>
        { ReactDOM.createPortal(
            (isOpen &&
                 <Modal
                     title={modalData.type === 'ingredient' ? 'Детали ингридиента' : ''}
                     classes={modalData.classes}>
                    <>
                        { modalData.type === 'ingredient'
                            ? <IngredientDetails ingredient={modalData.content}/>
                            : <OrderDetails order={modalData.content}/>
                        }

                    </>
                </Modal>),
            element
            )
        }
      <AppHeader />
      <AppContent>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
      </AppContent>
    </div>
  );
}

export default App;
