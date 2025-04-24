import { Link, useParams } from "react-router-dom";
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
import { taskStore } from "../../../store/taskStore";
import { ModalTaskSprint } from "../../ui/Sprint/ModalsSprint/ModalTaskSprint";
import { taskModalStore } from "../../../store/taskModalStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const SprintScreen = () => {
  const { id } = useParams();
  const { getSprintById } = useSprint();
  const [sprint, setSprint] = useState<ISprint>();
  const [taskPending, setTaskPending] = useState<ITask[]>([]);
  const [taskProccesing, setTaskProccesing] = useState<ITask[]>([]);
  const [taskComplete, setTaskComplete] = useState<ITask[]>([]);

  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const isOpen = taskModalStore((state) => state.isOpen);
  const openModal = taskModalStore((state) => state.openModal);
  const closeModal = taskModalStore((state) => state.closeModal);

  const refreshSprint = async () => {
    if (id) {
      const actualizado = await getSprintById(id);
      setSprint(actualizado);
    }
  };
  
  const filterTask = () => {
    if (!sprint || !sprint.tareas) return; // 🚫 Evita el error
  
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
  };
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
    const fetchSprintAndFilter = async () => {
      if (!id) return;
  
      const selectSprint = await getSprintById(id);
      setSprint(selectSprint);
  
      if (!selectSprint || !selectSprint.tareas) return; // 🚫 Evita el error
  
      const tareas = selectSprint.tareas;
  
      setTaskComplete(tareas.filter((t) => t.estado === "completada"));
      setTaskPending(tareas.filter((t) => t.estado === "pendiente"));
      setTaskProccesing(tareas.filter((t) => t.estado === "en proceso"));
    };
  
    fetchSprintAndFilter();
  }, [id]);
  

  const handleOpenModal = (task: ITask) => {
    setTareaActiva(task);
    openModal();
  };

  return (
    <>
      <Header title="Administrador de tareas: Sprint"></Header>

      <div className={styles.containerPrincipalListTareas}>
        <SprintList />
        <div className={styles.stateTaskContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.buttonBackBacklogContainer}>
              <Link to="/" className={styles.buttonBackBacklog}>
                <FontAwesomeIcon icon={faArrowLeft} color="black" />
                <p>Regresar a backlog</p>
              </Link>
            </div>
            <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
              {sprint?.nombre}
            </h3>
          </div>

          <div className={styles.taskColumContainer}>
          <TaskPending tasks={taskPending} openModal={handleOpenModal} />
<TaskProccesing tasks={taskProccesing} openModal={handleOpenModal} />
<TaskComplete tasks={taskComplete} openModal={handleOpenModal} />

          </div>
        </div>
      </div>

      {isOpen && <ModalTaskSprint handleCloseModal={closeModal} refreshSprint={refreshSprint} />}
      </>
  );
};
