import { Link, useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete";
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending";
import { TaskProccesing } from "../../ui/Sprint/StatusTask/TaskProccesing";
import styles from "./SprintScreen.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList";
import { ITask } from "../../../types/ITask";
import { taskStore } from "../../../store/taskStore";
import { ModalTaskSprint } from "../../ui/Sprint/ModalsSprint/ModalTaskSprint";
import { taskModalStore } from "../../../store/taskModalStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { sprintStore } from "../../../store/sprintBackLogStore";

export const SprintScreen = () => {
  const { id } = useParams();
  const { getSprintById } = useSprint();
  const [taskPending, setTaskPending] = useState<ITask[]>([]);
  const [taskProccesing, setTaskProccesing] = useState<ITask[]>([]);
  const [taskComplete, setTaskComplete] = useState<ITask[]>([]);
  const setsprintActiva = sprintStore((state) => state.setsprintActiva);
  const sprintActiva = sprintStore((state) => state.sprintActiva);
  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const isOpen = taskModalStore((state) => state.isOpen);
  const openModal = taskModalStore((state) => state.openModal);
  const closeModal = taskModalStore((state) => state.closeModal);

  const filterTask = () => {
    if (!sprintActiva) return;

    setTaskComplete(
      sprintActiva.tareas.filter((t) => t.estado === "completada")
    );
    setTaskPending(sprintActiva.tareas.filter((t) => t.estado === "pendiente"));
    setTaskProccesing(
      sprintActiva.tareas.filter((t) => t.estado === "en proceso")
    );
  };
  const getSprint = async () => {
    try {
      console.log("entrando en getsprint  id: " + id);
      if (id) {
        const selectSprint = await getSprintById(id);
        console.log(selectSprint);
        if (selectSprint) {
          setsprintActiva(selectSprint);
        } else {
          console.log("no se encontro un sprint activa");
        }
      }
    } catch {
      throw new Error("Error al tratar de conseguir un sprint por su id");
    }
  };

  useEffect(() => {
    getSprint();
  }, []);

  useEffect(() => {
    filterTask();
  }, [sprintActiva]);

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
                <FontAwesomeIcon icon={faArrowLeft} color="white" />
                <p>Regresar a backlog</p>
              </Link>
            </div>
            <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
              {sprintActiva?.nombre}
            </h3>
          </div>

          <div className={styles.taskColumContainer}>
            <TaskPending tasks={taskPending} openModal={handleOpenModal} />
            <TaskProccesing
              tasks={taskProccesing}
              openModal={handleOpenModal}
            />
            <TaskComplete tasks={taskComplete} openModal={handleOpenModal} />
          </div>
        </div>
      </div>

      {isOpen && <ModalTaskSprint handleCloseModal={closeModal} />}
    </>
  );
};
