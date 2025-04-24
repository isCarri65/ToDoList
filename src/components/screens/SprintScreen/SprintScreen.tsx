import { useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete";
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending";
import { TaskProccesing } from "../../ui/Sprint/StatusTask/TaskProccesing";
import styles from "./SprintScreen.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList";
import { ITask } from "../../../types/ITask";

export const SprintScreen = () => {
  const { id } = useParams();
  const { getSprintById } = useSprint();
  const [sprint, setSprint] = useState<ISprint>();
  const [taskPending, setTaskPending] = useState<ITask[]>([]);
  const [taskProccesing, setTaskProccesing] = useState<ITask[]>([]);
  const [taskComplete, setTaskComplete] = useState<ITask[]>([]);

  const filterTask = () => {
    if (sprint) {
      console.log("sprint encontrado");
      const filterCompleteTask = sprint.tareas.filter(
        (tarea) => tarea.estado === "completada"
      );
      setTaskComplete(filterCompleteTask);

      const filterPendingTask = sprint.tareas.filter(
        (tarea) => tarea.estado === "pendiente"
      );
      setTaskPending(filterPendingTask);

      const filterProccesingTask = sprint.tareas.filter(
        (tarea) => tarea.estado === "en proceso"
      );
      setTaskProccesing(filterProccesingTask);
    } else {
      console.log("No se encontro sprint activo");
    }
  };
  const getSprint = async () => {
    try {
      if (id) {
        const selectSprint = await getSprintById(id);
        setSprint(selectSprint);
      }
      filterTask();
    } catch {
      throw new Error("Error al tratar de conseguir un sprint por su id");
    }
  };
  useEffect(() => {
    getSprint();
  }, []);

  useEffect(() => {
    getSprint();
  }, [id]);
  useEffect(() => {
    filterTask();
  }, [sprint]);

  const openModal = () => {
    //logica para abrir el modal de la tarea activa
  };
  return (
    <>
      <Header title="Administrador de tareas: Sprint"></Header>

      <div className={styles.containerPrincipalListTareas}>
        <SprintList />
        <div className={styles.stateTaskContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.buttonBackBacklogContainer}>
              <button>
                <span
                  className={
                    "material-symbols-outlined " + `${styles.iconArrowBack}`
                  }
                >
                  arrow_back
                </span>
                <p>Regresar a backlog</p>
              </button>
            </div>
            <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
              {sprint?.nombre}
            </h3>
          </div>

          <div className={styles.taskColumContainer}>
            <TaskPending tasks={taskPending} openModal={openModal} />
            <TaskProccesing tasks={taskProccesing} openModal={openModal} />
            <TaskComplete tasks={taskComplete} openModal={openModal} />
          </div>
        </div>
      </div>
    </>
  );
};
