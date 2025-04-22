import styles from "./TaskStatus.module.css";

export const TaskComplete = () => {
  return (
    <div className={styles.tasks}>
      <h1 className={styles.titleTasks}> Tareas Completas</h1>
    </div>
  );
};
