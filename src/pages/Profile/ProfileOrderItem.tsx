import React, { Dispatch, useEffect } from "react";
import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleOrder } from "../../services/actions/store";

const ProfileOrderItem: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const pattern = /\/profile\/orders\/([a-fA-F0-9]+)/;
  const match = location.pathname.match(pattern);

  const currentSingleOrder = useSelector(
    (state: any) => state.storeReducer.currentSingleOrder,
  );
  useEffect(() => {
    if (match) {
      dispatch(getSingleOrder(match[1]));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(currentSingleOrder);
  }, [currentSingleOrder]);

  return currentSingleOrder ? <OrderItem data={currentSingleOrder} /> : null;
};
export default ProfileOrderItem;
