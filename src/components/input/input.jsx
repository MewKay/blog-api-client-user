import PropTypes from "prop-types";
import styles from "./input.module.css";
import InputErrorMessage from "../input-error-message/input-error-message";

const Input = ({ children, value, setValue, errorMessage, ...inputProps }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabelContainer}>
        {children}
        <input
          className={styles.inputText}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          {...inputProps}
        />
      </label>
      <InputErrorMessage value={value} errorMessage={errorMessage} />
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default Input;
