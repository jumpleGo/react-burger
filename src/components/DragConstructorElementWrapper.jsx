import PropTypes from "prop-types";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapperStyles from '../styles/DragConstructorElementWrapper.module.css'
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {BurgerIngredientItemPropsType} from "../helpers/propsTypes/BurgerIngredientItem";
import useDebouncedDrag from "../hooks/useDebounceDrag";
import {updateOrder} from "../services/actions/store";
function DragConstructorElementWrapper ({children, index, item}) {

    const dispatch  = useDispatch()

    const [, drag] = useDrag(() => ({
        type: 'LIST_ITEM',
        item: { index },
        end: (item, monitor) => {
            // Get the dragged item index and the drop result index
            const draggedIndex = index;
            const dropResult = monitor.getDropResult();
            console.log(dropResult,index)
            const endIndex = dropResult ;

            // Dispatch the action to move the item in the Redux store
            dispatch(updateOrder(draggedIndex, endIndex));
        },
    }));

    return (
        <div ref={drag} className={DragConstructorElementWrapperStyles.dragWrapper}>
            <DragIcon type="primary"  />
            {children}
        </div>
    )
}
DragConstructorElementWrapper.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    item: PropTypes.shape(BurgerIngredientItemPropsType),

}
export default DragConstructorElementWrapper