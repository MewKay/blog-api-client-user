import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";

const Layout = () => {
  return (
    <>
      <Header>
        <h1>ThyBlog</h1>
      </Header>
      <Outlet />
    </>
  );
};

export default Layout;
