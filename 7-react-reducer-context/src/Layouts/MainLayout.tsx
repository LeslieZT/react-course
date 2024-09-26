import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useNavigation } from "react-router-dom";
import { UserContextProvider } from "../context/userContext/userContextProvider";

export function MainLayout() {
  const navigation = useNavigation();
  console.log({ navigation });
  return (
    <>
      <UserContextProvider>
        <Header />
        {navigation.state === "loading" && <div>Loading...</div>}
        <Outlet />
        <Footer />
      </UserContextProvider>
    </>
  );
}
