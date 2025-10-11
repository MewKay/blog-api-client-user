import paths from "@/app/routes/paths";
import Button from "@/components/button/button";
import NetworkError from "@/lib/errors/network.error";
import ServerError from "@/lib/errors/server.error";
import PropTypes from "prop-types";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <main>
      <h3>{title}</h3>
      {children}
      <div>
        <Button
          colorScheme={"light"}
          onClick={() => navigate(paths.oneStepBack.path)}
        >
          Go Back
        </Button>
        <Button colorScheme={"light"} onClick={() => navigate(paths.home.path)}>
          Go Home
        </Button>
      </div>
    </main>
  );
};

ErrorLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const ErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof NetworkError) {
    return (
      <ErrorLayout title="Connection issue">
        We are unable to connect to ours servers. Please check your internet
        connection and try again.
      </ErrorLayout>
    );
  }

  if (error instanceof ServerError) {
    return (
      <ErrorLayout title="Server Temporarily Unavailable">
        Server is experiencing some technical difficulties. Please try again in
        a few minutes
      </ErrorLayout>
    );
  }

  return (
    <ErrorLayout title="Something went wrong.">
      We encountered an unexpected error while processing your request. Please
      try again in a few minutes.
    </ErrorLayout>
  );
};

export default ErrorBoundary;
