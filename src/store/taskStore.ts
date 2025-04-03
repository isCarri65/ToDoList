import { create } from "zustand";
import { ITask } from "../types/ITask";


export interface ITaskStore {
    tareas: ITask[]
    tareaActiva: ITask|null
    setTareaActiva: (tareaActiva: ITask|null) => void
    setArrayTareas: (arrayDeTareas: ITask[]) => void
    agregarNuevaTarea: (nuevaTarea: ITask) => void
    editarUnaTarea: (tareaActualizada: ITask) => void
    eliminarUnaTarea: (idTarea: string) => void
    
  }


export const taskStore = create<ITaskStore>((set) => ({

    tareas:[],
    tareaActiva: null,

    //funciones modificadoras para el array

    //agregar array de tareas
    setArrayTareas: (arrayDeTareas) => set(() => ({tareas:arrayDeTareas})),

    //agregar una tarea al array
    agregarNuevaTarea: (nuevaTarea) => set((state) => ({tareas: [... state.tareas, nuevaTarea]})),

    //editar una tarea del array
    editarUnaTarea: (tareaEditada) => set((state) => {
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? {...tarea, ...tareaEditada}: tarea)

        return {tareas: arregloTareas}
    }),

    //eliminar una tarea del array
    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea)
        
        return {tareas: arregloTareas}
    }),

    //setear la tarea activa
    setTareaActiva: (tareaActivaIn) => set(() => ({tareaActiva: tareaActivaIn}))
}))