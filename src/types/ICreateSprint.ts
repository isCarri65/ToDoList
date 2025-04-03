import { ITask } from "./ITask";

export interface ICreateSprint {
  fechaInicio: string;
  fechaCierre: string;
  nombre: string;
  tareas?: ITask[];
}
