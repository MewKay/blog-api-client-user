import commentSchema from "@/constants/commentSchema";
import PropTypes from "prop-types";

const CommentForm = ({
  handleCommentSubmit,
  handleResetForm,
  placeholder,
  inputValue = "",
  setInputValue,
}) => {
  const { errors, isFormValid } = commentSchema.validateInputs({
    text: inputValue,
  });
  const isValueNotEmpty = inputValue !== "";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isFormValid) {
          return;
        }

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
        <button type="submit" disabled={!isFormValid}>
          Send
        </button>
        <button type="reset" onClick={handleResetForm}>
          Cancel
        </button>
      </div>
      <p>{isValueNotEmpty && errors.text}</p>
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
