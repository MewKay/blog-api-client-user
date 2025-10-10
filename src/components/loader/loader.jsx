import { LoaderPinwheel } from "lucide-react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Loading</p>
      <LoaderPinwheel className={styles.icon} />
    </div>
  );
};

export default Loader;
