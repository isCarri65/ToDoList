import styles from "./TaskStatus.module.css";

export const TaskPending = () => {
  return (
    <div className={styles.tasks}>
      <h1 className={styles.titleTasks}> Tareas Pendientes</h1>
    </div>
  );
};
