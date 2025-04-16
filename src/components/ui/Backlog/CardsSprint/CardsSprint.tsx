import { FC } from "react";
import styles from "./CardSprint.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";
import { useNavigate } from "react-router-dom";

type ICardList = {
  sprint: ISprint;
  handleOpenModal: (sprint: ISprint) => void;
};

export const CardSprint: FC<ICardList> = ({ sprint, handleOpenModal }) => {
  const { deleteSprint } = useSprint();
  const nav = useNavigate();

  const eliminarTareaById = () => {
    deleteSprint(sprint.id!);
  };

  const editarTarea = () => {
    handleOpenModal(sprint);
  };

  const changeScreen = () => {
    nav(`/Sprints/${sprint.id}`);
  };

  return (
    <div onClick={changeScreen} className={styles.containerCard}>
      <div className={styles.containerDescription}>
        <h3>{sprint.nombre}</h3>
        <p>
          <b>Fecha inicio: {sprint.fechaInicio}</b>
        </p>
        <p>
          <b>Fecha limite: {sprint.fechaCierre}</b>
        </p>
      </div>

      <div className={styles.actionCard}>
        <button
          className={styles.buttonCardSprintDelete}
          onClick={eliminarTareaById}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="red" />
        </button>
        <button className={styles.buttonCardSprintEdit} onClick={editarTarea}>
          <FontAwesomeIcon icon={faPencilSquare} color="#5195EF" />
        </button>
      </div>
    </div>
  );
};
