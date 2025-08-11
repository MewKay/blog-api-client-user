import { Link } from "react-router-dom";

const Header = () => (
  <header>
    This is header
    <Link to={"/log-in"}>Log in</Link> <Link to={"/sign-up"}>Sign up</Link>
  </header>
);

export default Header;
