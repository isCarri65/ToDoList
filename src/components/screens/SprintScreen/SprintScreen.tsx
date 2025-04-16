import { useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete";
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending";
import { TaskProcecesing } from "../../ui/Sprint/StatusTask/TaskProccesing";
import styles from "./SprintScreen.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList";

export const SprintScreen = () => {
  const { id } = useParams();
  const { getSprintById } = useSprint();
  const [sprint, setSprint] = useState<ISprint>();
  const getSprint = async () => {
    try {
      if (id) {
        const selectSprint = await getSprintById(id);
        setSprint(selectSprint);
      }
    } catch {
      throw new Error("Error al tratar de conseguir un sprint por su id");
    }
  };
  useEffect(() => {
    getSprint();
  }, []);
  return (
    <>
      <Header title="Administrador de tareas: Sprint"></Header>
      <div className={styles.containerPrincipalListTareas}>
        <SprintList />
        <div className={styles.taskColumContainer}>
          <TaskPending />
          <TaskProcecesing />
          <TaskComplete />
        </div>
      </div>
    </>
  );
};
