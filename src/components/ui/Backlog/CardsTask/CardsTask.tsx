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
  const { deleteTask } = useTask();
  const { sprints } = useSprint();

  const eliminarTareaById = () => {
    deleteTask(tarea.id!);
  };

  const editarTarea = () => {
    handleOpenModal(tarea);
  };

  // Lista de opciones

  // Estado para la opción seleccionada
  const [seleccion, setSeleccion] = useState<string>("");

  // Manejar el cambio en el select
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeleccion(event.target.value);
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
          value={seleccion}
          onChange={handleChange}
          className={styles.selectSprintInput}
        >
          <option className={styles.opcionInput} value="" disabled>
            Enviar al Sprint
          </option>
          {sprints.map((opcion, index) => (
            <option
              className={styles.opcionInput}
              key={index}
              value={opcion.nombre}
            >
              {opcion.nombre}
            </option>
          ))}
        </select>
        {seleccion && (
          <p style={{ marginTop: "10px" }}>Seleccionaste: {seleccion}</p>
        )}
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
