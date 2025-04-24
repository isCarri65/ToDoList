import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./CardTaskTwo.module.css";
interface ICardTaskTwo {
  task: ITask;
  openModal: (task: ITask) => void;
}

export const CardTaskTwo: FC<ICardTaskTwo> = ({ task, openModal }) => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.containerDescription}>
        <p className={styles.title}>{task.titulo}</p>
        <p>
          <b>Fecha límite: {task.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.iconContainer} onClick={() => openModal(task)}>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>
  );
};
