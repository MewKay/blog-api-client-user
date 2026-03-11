import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./markdown.module.css";

const Markdown = ({ className, children }) => {
  return (
    <div className={className || styles.text}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table(props) {
            // eslint-disable-next-line no-unused-vars, react/prop-types
            const { node, ...rest } = props;
            return (
              <div className={styles.table}>
                <table {...rest} />
              </div>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

Markdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Markdown;
