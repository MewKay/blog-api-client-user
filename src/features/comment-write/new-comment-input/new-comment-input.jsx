import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import useBlogComments from "@/hooks/useBlogComments";

const NewCommentInput = () => {
  const { postId, updateComments } = useBlogComments();

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

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

export default NewCommentInput;
