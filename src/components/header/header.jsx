import PropTypes from "prop-types";

const Header = ({ children, className }) => {
  return <header className={className}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Header;
