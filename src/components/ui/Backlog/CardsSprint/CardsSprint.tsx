import { FC } from "react";
import styles from "./CardSprint.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";


type ICardList = {
    sprint: ISprint
    handleOpenModal: (sprint:ISprint) => void
}

export const CardSprint: FC<ICardList> = ({sprint, handleOpenModal}) => {

    const {deleteSprint} = useSprint();

    const eliminarTareaById = () => {
        deleteSprint(sprint.id!)
    }

    const editarTarea = () => {
        handleOpenModal(sprint)
    }

    return (
        <div className={styles.containerCard}>
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
                <button className={styles.buttonCardSprintDelete} onClick={eliminarTareaById}><FontAwesomeIcon icon={faTrashAlt} color="red" /></button>
                <button className={styles.buttonCardSprintEdit} onClick={editarTarea}><FontAwesomeIcon icon={faPencilSquare} color="#5195EF" /></button>
            </div>
        </div>
    )
}
