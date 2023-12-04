import React, { useEffect } from "react";
import { wsConnect } from "../../services/actions/userSocket";
import { wsUrlOrders } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../services/utils/cookie";

import { ISocketOrder } from "../../services/types";
import ProfileOrderCard from "./ProfileOrderCard";
import { useNavigate } from "react-router-dom";
import FeedCardStyles from "../../styles/Profile/FeedCard.module.css";
import ProfileOrderItem from "../../styles/Profile/ProfileOrderItem.module.css";

const ProfileOrders: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state: any) => state.wsUserReducer.orders);
  const wsConnected = useSelector(
    (state: any) => state.wsUserReducer.wsConnected,
  );
  const connect = () => {
    if (wsConnected) return;
    dispatch(
      wsConnect(wsUrlOrders + `?token=${getCookie("token")?.slice(7, -1)}`),
    );
  };

  const openRoute = (number: number) => {
    navigate(`/profile/orders/${number}`);
  };

  useEffect(() => {
    connect();
  }, [dispatch]);

  return (
    <div className={ProfileOrderItem.orders}>
      {orders.orders &&
        orders.orders?.length &&
        orders.orders.map((item: ISocketOrder) => {
          return (
            <ProfileOrderCard
              data={item}
              onClick={() => openRoute(item.number)}
            />
          );
        })}
    </div>
  );
};

export default ProfileOrders;
