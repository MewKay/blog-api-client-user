import { useParams } from "react-router-dom";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import sqids from "@/lib/sqids";
import PropTypes from "prop-types";

const NewCommentInput = ({ updateComments }) => {
  const { encodedId } = useParams();

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const postId = sqids.decode(encodedId);
    const text = formData.get("text");
    const token = authService.getToken();

    await commentService.createOne({ postId, text }, token);
    form.reset();
    updateComments();
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea name="text" placeholder="Write a new comment..."></textarea>
      <button>Send</button>
    </form>
  );
};

NewCommentInput.propTypes = {
  updateComments: PropTypes.func.isRequired,
};

export default NewCommentInput;
