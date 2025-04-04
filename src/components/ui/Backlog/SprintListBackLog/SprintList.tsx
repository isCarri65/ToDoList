import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SprintList.module.css";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import { CardSprint } from "../CardsSprint/CardsSprint";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useEffect, useState } from "react";
import { useSprint } from "../../../../hooks/useSprint";
import { ISprint } from "../../../../types/ISprint";
import { ModalSprint } from "../ModalsBacklog/ModalSprint";

export const SprintList = () => {
  const setTareaActiva = sprintStore((state) => state.setsprintActiva);

  const { getSprints, sprints } = useSprint();

  useEffect(() => {
    getSprints();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);

  const handleOpenModal = (tarea: ISprint) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  return (
    <div className={styles.sprints}>
      <h1 className={styles.titleSprint}> Sprints</h1>

      <button
        className={styles.addSprint}
        onClick={() => {
          setOpenModalTarea(true);
        }}
      >
        <FontAwesomeIcon icon={faThList} /> Agregar Sprint
      </button>

      <div className={styles.sprintsContainer}>
        {sprints.length > 0 ? (
          sprints.map((el, index) => (
            <CardSprint
              key={index}
              handleOpenModal={handleOpenModal}
              sprint={el}
            />
          ))
        ) : (
          <div>
            <h3>No hay sprints</h3>
          </div>
        )}
      </div>
      {openModalTarea && (
        <ModalSprint handleCloseModal={handleCloseModal}></ModalSprint>
      )}
    </div>
  );
};
