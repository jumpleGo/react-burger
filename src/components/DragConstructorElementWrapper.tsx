import React from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapperStyles from "../styles/DragConstructorElementWrapper.module.css";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";
import { updateOrder } from "../services/actions/store";

interface DragConstructorElementWrapperProps {
  children: React.ReactNode;
  index: number;
  item: IBurgerIngredientItem;
}

function DragConstructorElementWrapper({
  children,
  index,
  item,
}: DragConstructorElementWrapperProps) {
  const dispatch = useDispatch();

  const [, drag] = useDrag(() => ({
    type: "LIST_ITEM",
    item: { index },
    end: (item, monitor) => {
      const draggedIndex = index;
      const dropResult: { index: number } | null = monitor.getDropResult();

      if (!dropResult) {
        return;
      }

      const endIndex = dropResult.index;

      // Dispatch the action to move the item in the Redux store
      dispatch(updateOrder(draggedIndex, endIndex));
    },
  }));

  return (
    <div ref={drag} className={DragConstructorElementWrapperStyles.dragWrapper}>
      <DragIcon type="primary" />
      {children}
    </div>
  );
}

export default DragConstructorElementWrapper;
