import React from "react"; // Import React
import HeaderButtonStyles from "../styles/HeaderButton.module.css";

import { NavLink } from "react-router-dom";

interface HeaderButtonProps {
  to: string;
  active?: boolean;
  children?: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  const activeStatusClass = props.active
    ? HeaderButtonStyles.active
    : HeaderButtonStyles.notActive;
  return (
    <NavLink
      to={props.to}
      className={`${activeStatusClass} ${HeaderButtonStyles.headerButton} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
    >
      {props.children}
    </NavLink>
  );
};

export default HeaderButton;
