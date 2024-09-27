import { ReactNode } from 'react';
import { UserContext } from './userContext';
import { useUser } from '../../hooks/useUser';

export const UserContextProvider = ({ children }: { children: ReactNode }) => {


  // const state = {
  //   id: 1,
  //   name: "Jonh",
  //   email: "example@gmail.com"
  // };
  const user = useUser()


  return <UserContext.Provider value={{...user}}>{children}</UserContext.Provider>;
};
