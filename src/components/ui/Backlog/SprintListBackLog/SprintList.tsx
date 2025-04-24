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
  const setSprintModalActiva = sprintStore(
    (state) => state.setSprintModalActiva
  );
  const { getSprints, sprints } = useSprint();

  useEffect(() => {
    getSprints();
  }, []);

  const [openModalSprint, setOpenModalSprint] = useState(false);

  const handleOpenModal = (sprint: ISprint) => {
    setSprintModalActiva(sprint);
    setOpenModalSprint(true);
  };

  const handleCloseModal = () => {
    setSprintModalActiva(null);
    setOpenModalSprint(false);
  };
  return (
    <div className={styles.sprints}>
      <h1 className={styles.titleSprint}> Sprints</h1>

      <button
        className={styles.addSprint}
        onClick={() => {
          setOpenModalSprint(true);
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
      {openModalSprint && (
        <ModalSprint handleCloseModal={handleCloseModal}></ModalSprint>
      )}
    </div>
  );
};
