import { Link } from "react-router-dom";

const NotFound = () => (
  <main>
    <h3>Page not found</h3>
    <p>The page you are looking for does not exist.</p>
    <Link to={"/"}>Go Back Home</Link>
  </main>
);

export default NotFound;
