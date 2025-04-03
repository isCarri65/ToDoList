import { ITask } from "./ITarea";

export interface ISprint {
    id?: "",
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas?: ITask[]
}