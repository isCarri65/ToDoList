import { ITask } from "./ITarea";

export interface ISprint {
    id?: string,
    fechaInicio: string,
    fechaCierre: string,
    nombre: string,
    tareas?: ITask[]
}