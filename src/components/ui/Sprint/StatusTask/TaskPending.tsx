import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./TaskStatus.module.css";
import { CardTaskTwo } from "../../Backlog/CardTaskTwo/CardTaskTwo";
interface ITaskPending {
  tasks: ITask[];
  openModal: (task: ITask) => void;
}

export const TaskPending: FC<ITaskPending> = ({ tasks, openModal }) => {
  return (
    <div className={styles.tasks}>
      <p className={styles.stateTitle}>Tareas Pendientes</p>
      <div className={styles.taskContainer}>
        {tasks.map((element) => (
          <CardTaskTwo key={element.id} task={element} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};
