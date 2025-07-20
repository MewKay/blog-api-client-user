import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";
import useAuth from "@/hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <h1>ThyBlog</h1>
        {user && `Hello ${user.username} !`}
      </Header>
      <Outlet />
    </>
  );
};

export default Layout;
