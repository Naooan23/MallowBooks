import { useEffect, useState } from "react";
import type { ChildrenProp } from "../GeneralTypes";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) sessionStorage.setItem("user", JSON.stringify(user));
    else sessionStorage.removeItem("user");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};