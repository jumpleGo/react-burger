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
import {fetchData, order} from "../../api/burgerApi";
import {BurgerConstructorContext} from "../../services/burgerConstructorContext";
import ReactDOM from "react-dom";
import ModalOverlay from "../Modal/ModalOverlay";



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
        let orderData = null

        try{
            orderData = await order({ingredients: orderArr})
        } catch (err) {
            console.log(err)
            throw err
        }

        setModalData({
            content: orderData,
            type: 'order',
            classes: 'pt-30 pl-10 pr-10 pb-30'
        })
        openModal()
    }

    const fetchIngredients = async () => {
        let data = null
        try {
            data = await fetchData()

        } catch (err) {
            console.log(err)
            throw err
        }

        setData(data.data)
    }
  useEffect( () => {
      fetchIngredients()
  }, [])

  const element = document.getElementById("modal-root")
  return (
    <div className={`${AppStyles.App}`}>
        { ReactDOM.createPortal(
            (isOpen &&
                 <Modal
                     onClose={closeModal}
                     title={modalData.type === 'ingredient' && 'Детали ингридиента'}
                     classes={modalData.classes}>
                    <>
                        <ModalOverlay onClose={closeModal} />
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
          <BurgerConstructorContext.Provider value={{data, orderConfirm, addIngredient}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </BurgerConstructorContext.Provider>
      </AppContent>
    </div>
  );
}

export default App;
