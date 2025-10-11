import paths from "@/app/routes/paths";
import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./back-link.module.css";

const BackLink = ({ to = paths.oneStepBack.path, label = "Go back" }) => {
  return (
    <Link className={styles.backLink} to={to}>
      <ChevronLeft />
      {label}
    </Link>
  );
};

BackLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

export default BackLink;
