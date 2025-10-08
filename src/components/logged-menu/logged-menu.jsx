import { UserCircle } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./logged-menu.module.css";
import { useEffect, useRef, useState } from "react";

const LoggedMenu = ({ logout, username }) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const selectRef = useRef(null);

  const handleToggleVisible = (event) => {
    const clickedElement = event.target;
    const isButtonClicked =
      clickedElement.closest("button") === buttonRef.current;
    const isSelectClicked = clickedElement.closest("ul") === selectRef.current;

    if (isButtonClicked) {
      setIsVisible((visibility) => !visibility);
      return;
    }

    if (isSelectClicked) {
      return;
    }

    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleToggleVisible);

    return () => {
      window.removeEventListener("click", handleToggleVisible);
    };
  }, []);

  const selectActionClassName = isVisible
    ? styles.selectAction
    : `${styles.selectAction} ${styles.hidden}`;

  return (
    <div className={styles.userAction}>
      <button
        ref={buttonRef}
        className={styles.toggleAction}
        aria-label="Open user actions"
      >
        <UserCircle />
      </button>
      <ul ref={selectRef} className={selectActionClassName}>
        <li className={styles.username}>{username}</li>
        <li>
          <button className={styles.logOutButton} onClick={logout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

LoggedMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default LoggedMenu;
