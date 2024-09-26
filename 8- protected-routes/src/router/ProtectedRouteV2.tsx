import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext/userContext';
// import { useUserLogin } from '../hooks/useUserLogin';


export const  ProtectedRouteV2 = () => {
  // const { user } = useUserLogin()
  const { user } = useContext(UserContext)

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={{ user }} />;
};
