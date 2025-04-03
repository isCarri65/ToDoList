import { getTareasController, getTareasSprintController, updateTareaSprintController } from "../../../data/tareaController"
import { ITarea } from "../../../types/ITarea"
import { Header } from "../../ui/Header/Header"
import { ListTasks } from "../../ui/Backlog/ListTasks/ListTasks"
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList"
import styles from "./BacklogScreen.module.css"

export const BacklogScreen = () => {
  const obtenerTareas = async ()=>{
    const tareas =  await getTareasController()
    console.log(tareas)
  }
  const obtenerTareasDeSprint = async()=>{
    const tareasSprint = await getTareasSprintController("b0e3f34b-68c6-49eb-b059-ab251ed81629")
    console.log(tareasSprint)
  }
   
  const tareaEditada: ITarea = {
    id: "50699dec-3d1a-45ff-a94d-82d416eac053",
    titulo: "Tarea 200",
    descripcion: "Editando tarea del sprint",
    estado: "pendiente",
    fechaLimite: "2025-03-06"
  }
  const actulizarTareaSprint = async () =>{
    updateTareaSprintController(tareaEditada,"b0e3f34b-68c6-49eb-b059-ab251ed81629")
  }
  return (
    <>
     {/* <div>BacklogScreen</div>
     <button onClick={obtenerTareas}>obtener tareas</button>
     <button onClick={actulizarTareaSprint}>actualizar tarea del sprint</button>
     <button onClick={obtenerTareasDeSprint}>Obtener Tareas de un sprint</button> */}
    <Header></Header>
    <div className={styles.containerPrincipalListTareas}>
    <h1 className={styles.titleBackLog}>BackLog</h1>
    <SprintList/>
    <ListTasks/>
    </div>
    </>
   
  )
}
