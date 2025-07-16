import PropTypes from "prop-types";

const Input = ({ children, value, setValue, ...inputProps }) => {
  return (
    <label>
      {children}
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        {...inputProps}
      />
    </label>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Input;
