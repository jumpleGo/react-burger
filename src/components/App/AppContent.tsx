import React, { FunctionComponent } from "react";

import AppContentStyles from "../../styles/App/AppContent.module.css";

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: FunctionComponent<AppContentProps> = ({ children }) => {
  return <main className={AppContentStyles.appContent}>{children}</main>;
};

export default AppContent;
