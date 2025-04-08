import { FC, useState } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./CardTask.module.css";
import { useTask } from "../../../../hooks/useTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSprint } from "../../../../hooks/useSprint";

type ICardList = {
  tarea: ITask;
  handleOpenModal: (tarea: ITask) => void;
};

export const CardTask: FC<ICardList> = ({ tarea, handleOpenModal }) => {
  const { deleteTask, moveTaskToSprint } = useTask();
  const { sprints } = useSprint();

  const [arrowDirection, setArrowDirection] = useState(false);

  const eliminarTareaById = () => {
    deleteTask(tarea.id!);
  };

  const editarTarea = () => {
    handleOpenModal(tarea);
  };

  // Manejar el cambio en el select
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    console.log(id);
    moveTaskToSprint(tarea, id);
  };
  const handleChangeArrow = () => {
    setArrowDirection(!arrowDirection);
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerDescription}>
        <h3>{tarea.titulo}</h3>
        <p>Descripción: {tarea.descripcion}</p>
        <p>
          <b>Fecha límite: {tarea.fechaLimite}</b>
        </p>
      </div>

      <div
        className={styles.sprintSelectContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          margin: "20px auto",
        }}
      >
        <label
          htmlFor="miSelect"
          style={{ marginBottom: "5px", fontWeight: "bold" }}
        ></label>
        <select
          id="miSelect"
          onChange={handleChange}
          onBlur={handleChangeArrow}
          onFocus={handleChangeArrow}
          className={styles.selectSprintInput}
          value=""
        >
          <option className={styles.opcionInput} value="">
            Designar sprint
          </option>
          {sprints.map((opcion, index) => (
            <option
              className={styles.opcionInput}
              key={index}
              value={opcion.id}
            >
              {opcion.nombre}
            </option>
          ))}
        </select>
        <span
          className={
            "material-symbols-outlined " +
            `${arrowDirection ? styles.arrowIcon : styles.arrowIcon2}`
          }
        >
          keyboard_arrow_down
        </span>
      </div>

      <div className={styles.actionCard}>
        <button
          className={styles.buttonCardTaskDelete}
          onClick={eliminarTareaById}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="red" />
        </button>
        <button className={styles.buttonCardTaskEdit} onClick={editarTarea}>
          <FontAwesomeIcon icon={faPencilSquare} color="#5195EF" />
        </button>
      </div>
    </div>
  );
};
//<button className={styles.buttonCardTaskSee} ><FontAwesomeIcon icon={faEye} color="#5195EF" /></button>
