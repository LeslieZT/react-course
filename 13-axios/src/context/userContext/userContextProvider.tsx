import {  ReactNode, useState } from "react";
import { User, UserContext } from "./userContext";



export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();

  const login = async () => {
    console.log("LOGIN")
    setTimeout(() => {
      setUser({
        id: '1',
        username: 'John Doe',
        email: 'fake@email.com',
      } as User);
    }, 3000);
  };

  const logOut = () => {
    setUser(undefined);
  };
  console.log({ user });
  const state = {
    user,
    logOut,
    login,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
