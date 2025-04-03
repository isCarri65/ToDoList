
import { useEffect, useState } from "react"
import styles from "./ListTask.module.css"
import { useTask } from "../../../../hooks/useTasks"
import { taskStore } from "../../../../store/taskStore"
import { CardTask } from "../CardsTask/CardsTask"
import { ModalTask } from "../ModalsBacklog/ModalTask"
import { SearchBarTask } from "../SearchBarTask/SearchBarTask"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList } from "@fortawesome/free-solid-svg-icons"
import { ITask } from "../../../../types/ITask"


export const  ListTasks = () => {
    const setTareaActiva = taskStore((state) => state.setTareaActiva)


    const {getTask, tareas} = useTask()

    useEffect(() => {
        getTask();
    },[])

    const [openModalTarea, setOpenModalTarea] = useState(false);

    const handleOpenModal = (tarea:ITask) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false);
    }
    return (
        <div className={styles.tasks}>
            <h1 className={styles.tittleTasks}> Lista Tareas</h1>
            <div className={styles.containerSearchButton}>
            <SearchBarTask/>
            <button className={styles.addTask} onClick={() => {setOpenModalTarea(true)}}><FontAwesomeIcon icon={faThList}/> Agregar tarea</button>
            </div>

            {
                    tareas.length > 0 ? tareas.map(
                        (el, index) => <CardTask key={index} handleOpenModal={handleOpenModal} tarea = {el}></CardTask>) : 
                        <div>
                            <h3>No hay tareas</h3>
                        </div>
                }
            {openModalTarea && <ModalTask handleCloseModal={handleCloseModal}></ModalTask>}

        </div>
    )
}
