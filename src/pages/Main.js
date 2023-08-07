import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor";
import AppContent from "../components/App/AppContent";
import React, {useEffect} from "react";
import {useAuth} from "../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

function Main () {
    return (
        <AppContent>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </AppContent>
    )
}

export default Main