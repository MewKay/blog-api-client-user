import { BlogCommentsContext } from "@/context/blog-comments.context";
import { useContext } from "react";

const useBlogComments = () => useContext(BlogCommentsContext);

export default useBlogComments;
