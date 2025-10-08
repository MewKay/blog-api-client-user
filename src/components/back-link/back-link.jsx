import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./back-link.module.css";

const BackLink = ({ to = -1, label = "Go back" }) => {
  return (
    <Link className={styles.backLink} to={to}>
      <ChevronLeft />
      {label}
    </Link>
  );
};

BackLink.propTypes = {
  to: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

export default BackLink;
