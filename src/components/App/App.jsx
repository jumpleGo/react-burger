import React, {useEffect} from 'react';
import AppStyles from '../../styles/App/App.module.css';
import AppHeader from './AppHeader'
import AppContent from "./AppContent";
import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";
import OrderDetails from "../Modal/OrderDetails"
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {cleanModalData, getIngredients} from "../../services/actions/store";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../services/actions/modal";



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

    const close = () => {
        dispatch(closeModal())
        dispatch(cleanModalData())
    }


  return (
    <div className={`${AppStyles.App}`}>
        {
            (isOpen &&
                 <Modal
                     title={modalData.type === 'ingredient' ? 'Детали ингридиента' : ''}
                     classes={modalData.classes}
                 close={close}>
                    <>
                        { modalData.type === 'ingredient'
                            ? <IngredientDetails ingredient={modalData.content}/>
                            : <OrderDetails order={modalData.content}/>
                        }

                    </>
                </Modal>)
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
