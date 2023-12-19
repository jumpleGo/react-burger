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
import { useLocation, useNavigate } from "react-router-dom";
import ProfileOrderItem from "../../styles/Profile/ProfileOrderItem.module.css";
import { compareArrs } from "../../helpers/functions";
import { addModalIngredient } from "../../services/actions/store";

const ProfileOrders: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useSelector((state) => state.wsUserReducer.orders);

  useEffect(() => {
    console.log("connect");
    dispatch(
      wsConnect(
        wsUrlOrders +
          `?token=${getCookie("token")?.replace("Bearer", "").trim()}`,
      ),
    );
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(wsDisconnect());
    };
  }, [wsDisconnect, dispatch]);

  const openRoute = (number: number) => {
    dispatch(
      addModalIngredient({
        content: number,
        type: "userOrder",
        classes: "pt-10 pl-10 pr-10 pb-15",
      }),
    );
    navigate(`/profile/orders/${number}`, {
      state: { backgroundLocation: location, number },
    });
  };

  return (
    <div className={ProfileOrderItem.orders}>
      {orders?.orders &&
        orders.orders?.length &&
        orders.orders.map((item: ISocketOrder) => {
          return (
            <ProfileOrderCard
              key={item._id}
              data={item}
              onClick={() => openRoute(item.number)}
            />
          );
        })}
    </div>
  );
};

export default ProfileOrders;
