import { OrderStatus } from "../services/types";

type TranslateTabs = {
  [key: string]: string;
};

export const translateTabs: TranslateTabs = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

export const getStatus = (status: OrderStatus) => {
  switch (status) {
    case "done":
      return "Готов";
    case "pending":
      return "Готовится";
    case "created":
      return "Создан";
  }
};
