import React, { useEffect } from "react";
import { wsConnect, wsDisconnect } from "../../services/actions/userSocket";
import {
  RootState,
  useDispatch,
  useSelector,
  wsUrlOrders,
} from "../../services/store";
import { getCookie } from "../../services/utils/cookie";

import { ISocketOrder } from "../../services/types";
import ProfileOrderCard from "./ProfileOrderCard";
import { useNavigate } from "react-router-dom";
import ProfileOrderItem from "../../styles/Profile/ProfileOrderItem.module.css";
import { compareArrs } from "../../helpers/functions";

const ProfileOrders: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector((state: RootState) => state.wsUserReducer.orders);

  useEffect(() => {
    console.log("connect");
    dispatch(
      wsConnect(wsUrlOrders + `?token=${getCookie("token")?.slice(7, -1)}`),
    );
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(wsDisconnect());
    };
  }, [wsDisconnect, dispatch]);

  const openRoute = (number: number) => {
    navigate(`/profile/orders/${number}`);
  };

  return (
    <div className={ProfileOrderItem.orders}>
      {orders?.orders &&
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
