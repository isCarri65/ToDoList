import { create } from "zustand";
import { ISprint } from "../types/ISprint";


export interface ISprintStore {
    sprints: ISprint[]
    sprintActiva: ISprint|null
    setsprintActiva: (sprintActiva: ISprint|null) => void
    setArraysprints: (arrayDesprints: ISprint[]) => void
    agregarNuevasprint: (nuevasprint: ISprint) => void
    editarUnasprint: (sprintActualizada: ISprint) => void
    eliminarUnasprint: (idsprint: string) => void
    
  }


export const sprintStore = create<ISprintStore>((set) => ({

    sprints:[],
    sprintActiva: null,

    //funciones modificadoras para el array

    //agregar array de sprints
    setArraysprints: (arrayDesprints) => set(() => ({sprints:arrayDesprints})),

    //agregar una sprint al array
    agregarNuevasprint: (nuevasprint) => set((state) => ({sprints: [... state.sprints, nuevasprint]})),

    //editar una sprint del array
    editarUnasprint: (sprintEditada) => set((state) => {
        const arreglosprints = state.sprints.map((sprint) => sprint.id === sprintEditada.id ? {...sprint, ...sprintEditada}: sprint)

        return {sprints: arreglosprints}
    }),

    //eliminar una sprint del array
    eliminarUnasprint: (idsprint) => set((state) => {
        const arreglosprints = state.sprints.filter((sprint) => sprint.id !== idsprint)
        
        return {sprints: arreglosprints}
    }),

    //setear la sprint activa
    setsprintActiva: (sprintActivaIn) => set(() => ({sprintActiva: sprintActivaIn}))
}))