import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { encodedId, slug } = useParams();

  return (
    <main>
      <p>
        Hello route {encodedId}/{slug}
      </p>
    </main>
  );
};

export default BlogPost;
