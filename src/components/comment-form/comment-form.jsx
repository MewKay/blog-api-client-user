import commentSchema from "@/constants/commentSchema";
import PropTypes from "prop-types";
import InputErrorMessage from "../input-error-message/input-error-message";
import Button from "../button/button";
import styles from "./comment-form.module.css";

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
      className={styles.container}
      onSubmit={(event) => {
        event.preventDefault();
        if (!isFormValid) {
          return;
        }

        handleCommentSubmit(event);
      }}
    >
      <textarea
        className={styles.input}
        name="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      ></textarea>
      <InputErrorMessage value={inputValue} errorMessage={errors.text} />
      <div className={styles.buttonContainer}>
        <Button
          className={styles.sendButton}
          colorScheme={"dark"}
          type="submit"
          disabled={!isFormValid}
        >
          Send
        </Button>
        <Button colorScheme={"light"} type="reset" onClick={handleResetForm}>
          Cancel
        </Button>
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
