import ScrollButton from "@/components/scroll-button/scroll-button";
import PostList from "@/features/post-list/post-list";
import useScrollButtonVisibility from "@/hooks/useScrollButtonVisibility";

const Home = () => {
  const scrollVisibility = useScrollButtonVisibility();

  return (
    <main>
      <PostList />
      <ScrollButton isVisible={scrollVisibility} />
    </main>
  );
};

export default Home;
