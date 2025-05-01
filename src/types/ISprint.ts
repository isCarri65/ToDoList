import { ITask } from "./ITask";

export interface ISprint {
  id: string;
  fechaInicio: string;
  fechaCierre: string;
  nombre: string;
  tareas: ITask[];
  color: string;
}
