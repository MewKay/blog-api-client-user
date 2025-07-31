import PropTypes from "prop-types";

const CommentForm = ({
  handleCommentSubmit,
  handleResetForm,
  placeholder,
  inputValue = "",
  setInputValue,
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleCommentSubmit(event);
      }}
    >
      <textarea
        name="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      ></textarea>
      <div>
        <button type="submit">Send</button>
        <button type="reset" onClick={handleResetForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  handleCommentSubmit: PropTypes.func.isRequired,
  handleResetForm: PropTypes.func,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
};

export default CommentForm;
