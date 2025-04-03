import { FC } from "react";
import { ITask } from "../../../../types/ITarea";
import styles from "./CardTask.module.css";
import { useTask } from "../../../../hooks/useTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


type ICardList = {
    tarea: ITask
    handleOpenModal: (tarea:ITask) => void
}

export const CardTask: FC<ICardList> = ({tarea, handleOpenModal}) => {

    const {deleteTask} = useTask();

    const eliminarTareaById = () => {
        deleteTask(tarea.id!)
    }

    const editarTarea = () => {
        handleOpenModal(tarea)
    }

    return (
        <div className={styles.containerCard}>
            <div className={styles.containerDescription}>
                <h3>Título: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>
                    <b>Fecha límite: {tarea.fechaLimite}</b>
                </p>
            </div>

            <div className={styles.actionCard}>
                <button className={styles.buttonCardTaskDelete} onClick={eliminarTareaById}><FontAwesomeIcon icon={faTrashAlt} color="red" /></button>
                <button className={styles.buttonCardTaskEdit} onClick={editarTarea}><FontAwesomeIcon icon={faPencilSquare} color="#5195EF" /></button>
                <button className={styles.buttonCardTaskSee} ><FontAwesomeIcon icon={faEye} color="#5195EF" /></button>
            </div>
        </div>
    )
}
