import { useParams } from "react-router-dom";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import sqids from "@/lib/sqids";

const NewCommentInput = () => {
  const { encodedId } = useParams();

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const postId = sqids.decode(encodedId);
    const text = formData.get("text");
    const token = authService.getToken();

    await commentService.createOne({ postId, text }, token);
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea name="text" placeholder="Write a new comment..."></textarea>
      <button>Send</button>
    </form>
  );
};

export default NewCommentInput;
