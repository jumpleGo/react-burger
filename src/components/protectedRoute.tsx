import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  element,
}) => {
  const location = useLocation();
  const { getUser, user } = useAuth(); // Assuming getUser returns a Promise
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async (): Promise<void> => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return user ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
