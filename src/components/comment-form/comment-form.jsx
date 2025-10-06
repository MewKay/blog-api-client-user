import commentSchema from "@/constants/commentSchema";
import PropTypes from "prop-types";
import InputErrorMessage from "../input-error-message/input-error-message";

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
      <InputErrorMessage value={inputValue} errorMessage={errors.text} />
      <div>
        <button type="submit" disabled={!isFormValid}>
          Send
        </button>
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
