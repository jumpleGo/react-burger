import React, {useEffect, useState} from 'react';
import AppStyles from '../../styles/App/App.module.css';
import AppHeader from './AppHeader'
import AppContent from "./AppContent";
import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";
import OrderDetails from "../Modal/OrderDetails"
import useModal from "../../hooks/useModal";
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import {fetchData, order} from "../../api/burgerApi";
import {BurgerConstructorContext} from "../../services/burgerConstructorContext";



function App() {
  const [data, setData] = useState([])
  const [isOpen, openModal, closeModal] = useModal()
  const [modalData, setModalData] = useState({
    content: null,
    type: '',
      classes: ''
  });

    const addIngredient = (content) => {
        setModalData({
            content,
            type: 'ingredient',
            classes: 'pt-10 pl-10 pr-10 pb-15'
        })

        openModal()
    }

    const orderConfirm = async (orderArr) => {
        const orderData = await order({ingredients: orderArr})
        setModalData({
            content: orderData,
            type: 'order',
            classes: 'pt-30 pl-10 pr-10 pb-30'
        })
        openModal()
    }

    const fetchIngredients = async () => {
        const data = await fetchData()
        setData(data.data)
    }
  useEffect( () => {
      fetchIngredients()
  }, [])



  return (
    <div className={`${AppStyles.App}`}>
        <ModalWrapper onClose={closeModal} display={isOpen? 'flex' : 'none'}>
            { isOpen && <Modal onClose={closeModal} title={modalData.type === 'ingredient' && 'Детали ингридиента'} classes={modalData.classes} isOpen={isOpen}>
                <>
                    {
                        modalData.type === 'ingredient'
                            ? <IngredientDetails ingredient={modalData.content}/>
                            : <OrderDetails order={modalData.content}/>
                    }
                </>

            </Modal>
            }
        </ModalWrapper>
      <AppHeader />
      <AppContent>
          <BurgerIngredients data={data} onIngredientSelect={addIngredient} />
          <BurgerConstructorContext.Provider value={{data, orderConfirm}}>
            <BurgerConstructor />
          </BurgerConstructorContext.Provider>
      </AppContent>
    </div>
  );
}

export default App;
