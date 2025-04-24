import { FC, MouseEvent } from "react";
import styles from "./CardSprint.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";
import { useNavigate } from "react-router-dom";
import { sprintStore } from "../../../../store/sprintBackLogStore";

type ICardList = {
  sprint: ISprint;
  handleOpenModal: (sprint: ISprint) => void;
};

export const CardSprint: FC<ICardList> = ({ sprint, handleOpenModal }) => {
  const { deleteSprint } = useSprint();
  const setsprintActiva = sprintStore((state) => state.setsprintActiva);
  const nav = useNavigate();

  const eliminarTareaById = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteSprint(sprint.id!);
  };

  const editarTarea = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleOpenModal(sprint);
  };

  const changeScreen = () => {
    setsprintActiva(sprint);
    nav(`/Sprints/${sprint.id}`);
  };

  return (
    <div onClick={changeScreen} className={styles.containerCard}>
      <div className={styles.containerDescription}>
        <div className={styles.sprintTitle}>
          <h3>{sprint.nombre}</h3>
        </div>
        <div>
          <p>
            <b>Fecha inicio: {sprint.fechaInicio}</b>
          </p>
          <p>
            <b>Fecha limite: {sprint.fechaCierre}</b>
          </p>
        </div>
      </div>

      <div className={styles.actionCard}>
        <button className={styles.buttonCardSprint} onClick={eliminarTareaById}>
          <FontAwesomeIcon icon={faTrashAlt} color="red" />
        </button>
        <button className={styles.buttonCardSprint} onClick={editarTarea}>
          <FontAwesomeIcon icon={faPencilSquare} color="#5195EF" />
        </button>
      </div>
    </div>
  );
};
