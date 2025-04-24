import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./TaskStatus.module.css";
import { CardTaskTwo } from "../../Backlog/CardTaskTwo/CardTaskTwo";
interface ITaskProccesing {
  tasks: ITask[];
  openModal: VoidFunction;
}
export const TaskProccesing: FC<ITaskProccesing> = ({ tasks, openModal }) => {
  return (
    <div className={styles.tasks}>
      <p className={styles.stateTitle}>Tareas en Proceso</p>
      <div>
        {tasks.map((element) => (
          <CardTaskTwo key={element.id} task={element} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};
