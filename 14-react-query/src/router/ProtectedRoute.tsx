import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserLogin } from '../hooks/useUserLogin';
// import { UserContext } from '../context/userContext/userContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserLogin();
  // const { user } = useContext(UserContext)  
  return user?.id ? children : <Navigate to="/" replace />;
};
