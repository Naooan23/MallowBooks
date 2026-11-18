import { useEffect, useState } from "react";
import type { ChildrenProp } from "../GeneralTypes";
import type { User } from "./ServicesTypes";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = sessionStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      sessionStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
