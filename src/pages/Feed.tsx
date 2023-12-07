import React, { useEffect, useState } from "react";
import FeedStyles from "../styles/pages/Feed.module.css";
import FeedCard from "../components/Profile/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect, wsDisconnect } from "../services/actions/socket";
import { RootState, wsUrlAllOrders } from "../services/store";

import { getByStatus } from "../services/getters/allOrders";

import { ISocketOrder } from "../services/types";
import { useNavigate } from "react-router-dom";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.wsReducer.orders);
  const [doneOrders, setDoneOrders] = useState<Record<string, ISocketOrder[]>>(
    {},
  );
  const [pendingOrders, setPendingOrders] = useState<
    Record<string, ISocketOrder[]>
  >({});

  const navigate = useNavigate();
  const openRoute = (number: number) => {
    navigate(`/feed/${number}`);
  };

  useEffect(() => {
    dispatch(wsConnect(wsUrlAllOrders));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(wsDisconnect());
    };
  }, [wsDisconnect, dispatch]);

  useEffect(() => {
    const done = getByStatus(orders, "done");
    const pending = getByStatus(orders, "pending");
    if (done) setDoneOrders(done);
    if (pending) setPendingOrders(pending);
  }, [orders]);

  return (
    <div className={FeedStyles.feed}>
      <h2 className={`${FeedStyles.feed_title} text text_type_main-large mb-5`}>
        Лента заказов
      </h2>
      <div className={FeedStyles.content}>
        <div className={FeedStyles.feed_orders}>
          {orders?.orders &&
            orders.orders.length &&
            orders.orders.map((item: ISocketOrder, index: number) => {
              return (
                <FeedCard
                  data={item}
                  onClick={() => openRoute(item.number)}
                  key={index}
                />
              );
            })}
        </div>
        <div className={FeedStyles.feed_order_numbers}>
          <div className={FeedStyles.feed_orders_list}>
            <div className={`${FeedStyles.ready}  `}>
              <div className="text text_type_main-medium">Готовы:</div>
              <div className={FeedStyles.ordersList}>
                {doneOrders &&
                  Object.keys(doneOrders)?.length &&
                  Object.keys(doneOrders).map((key) => {
                    return (
                      <div
                        className={`${FeedStyles.digits_list} mt-6`}
                        key={key}
                      >
                        {doneOrders[key].map(
                          (item: ISocketOrder, index: number) => {
                            return (
                              <span
                                key={`${item.number}-done`}
                                className={`${FeedStyles.green_digit} text text_type_digits-default`}
                              >
                                {item.number}
                              </span>
                            );
                          },
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={`${FeedStyles.in_work} text text_type_main-medium`}>
              <div className="title">В работе:</div>
              <div className={FeedStyles.ordersList}>
                {pendingOrders &&
                  (Object.keys(pendingOrders).length || "") &&
                  Object.keys(pendingOrders).map((key) => {
                    return (
                      <div
                        className={`${FeedStyles.digits_list} mt-6`}
                        key={`${key}-in-works-blocks`}
                      >
                        {pendingOrders[key].map(
                          (item: ISocketOrder, index: number) => {
                            return (
                              <span
                                key={`${item.number}-work`}
                                className={`${FeedStyles.green_digit} text text_type_digits-default`}
                              >
                                {item.number}
                              </span>
                            );
                          },
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={`${FeedStyles.all_orders} mt-15`}>
            <div className="text text_type_main-medium">
              Выполнено за все время:
            </div>
            <div className="text text_type_digits-large">{orders?.total}</div>
          </div>
          <div className={`${FeedStyles.today_orders} mt-15`}>
            <div className="text text_type_main-medium">
              Выполнено за сегодня:
            </div>
            <div className="text text_type_digits-large">
              {orders?.totalToday}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
