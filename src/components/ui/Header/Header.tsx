import { FC } from "react";
import styles from "./Header.module.css";
interface IHeader {
  title: string;
}
export const Header: FC<IHeader> = ({ title }) => {
  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerTitleHeader}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
