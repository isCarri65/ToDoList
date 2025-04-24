import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./TaskStatus.module.css";
import { CardTaskTwo } from "../../Backlog/CardTaskTwo/CardTaskTwo";

interface ITaskComplete {
  tasks: ITask[];
  openModal: VoidFunction;
}
export const TaskComplete: FC<ITaskComplete> = ({ tasks, openModal }) => {
  return (
    <div className={styles.tasks}>
      <p className={styles.stateTitle}>Tareas Completas</p>
      <div>
        {tasks.map((element) => (
          <CardTaskTwo key={element.id} task={element} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};
