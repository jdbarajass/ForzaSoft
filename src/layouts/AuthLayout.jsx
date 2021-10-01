import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gary-50 py-2 px-4">
      Layoout Autenticacion
      <div className = "flex w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
