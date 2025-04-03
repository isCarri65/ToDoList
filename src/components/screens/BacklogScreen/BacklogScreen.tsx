import { Header } from "../../ui/Header/Header"
import { ListTasks } from "../../ui/Backlog/ListTasks/ListTasks"
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList"
import styles from "./BacklogScreen.module.css"

export const BacklogScreen = () => {

  return (
    <>
    <Header></Header>
    <div className={styles.containerPrincipalListTareas}>
    <SprintList/>
    <ListTasks/>
    </div>
    </>
   
  )
}
