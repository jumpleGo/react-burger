import React, { Dispatch, useEffect } from "react";
import OrderItem from "./Profile/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../services/actions/store";
import { useLocation } from "react-router-dom";
import { wsDisconnect } from "../services/actions/socket";
import { RootState } from "../services/store";

const FeedItem: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();

  const pattern = /\/feed\/([a-fA-F0-9]+)/;
  const match = location.pathname.match(pattern);
  const currentSingleOrder = useSelector(
    (state: RootState) => state.storeReducer.currentSingleOrder,
  );

  useEffect(() => {
    if (match) {
      dispatch(getSingleOrder(match[1]));
    }
  }, [dispatch]);

  return currentSingleOrder?._id ? (
    <OrderItem data={currentSingleOrder} />
  ) : (
    <></>
  );
};

export default FeedItem;
