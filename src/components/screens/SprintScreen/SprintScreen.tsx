import { Header } from "../../ui/Header/Header"
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete"
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending"
import { TaskProcecesing } from "../../ui/Sprint/StatusTask/TaskProccesing"
import styles from "./SprintScreen.module.css"

export const SprintScreen = () => {

  return (
    <>
    <Header></Header>
    <div className={styles.containerPrincipalListTareas}>
    <h1 className={styles.titleBackLog}>BackLog</h1>
    <TaskPending/>
    <TaskProcecesing/>
    <TaskComplete/>
    </div>
    </>
   
  )
}
