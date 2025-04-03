import { useShallow } from "zustand/shallow"
import { createSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintControllers"
import Swal from "sweetalert2"
import { sprintStore } from "../store/sprintBackLogStore"
import { ISprint } from "../types/ISprint"


export const useSprint = () => {

    const {sprints,setArraysprints,agregarNuevasprint,eliminarUnasprint,editarUnasprint} = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        setArraysprints: state.setArraysprints,
        agregarNuevasprint: state.agregarNuevasprint,
        eliminarUnasprint: state.eliminarUnasprint,
        editarUnasprint: state.editarUnasprint
    })))

    const getTask = async() => {
        const data = await getSprintsController();
        if(data) setArraysprints(data);
    }

    const createSprint = async (newSprint:ISprint) => {
        agregarNuevasprint(newSprint)
        try {
            await createSprintController(newSprint);
            Swal.fire("Éxito", "Sprint creado correctamente", "success")
        }catch (error){
            eliminarUnasprint(newSprint.id!);
            console.log("Algo salió mal al crear la sprint")
        }
    }

    const editTask = async (sprintEditada:ISprint) => {

        const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id)

        editarUnasprint(sprintEditada)
        try {
            await updateSprintController(sprintEditada);
            Swal.fire("Éxito", "Sprint actualizado correctamente", "success")
        }catch (error) {
            if (estadoPrevio) editarUnasprint(estadoPrevio);
            console.log("Algo salió mal al editar")
        }
    }

    const deleteSprint = async (idSprint:string) => {

        const estadoPrevio = sprints.find((el) => el.id === idSprint)

        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
            cancelButtonText: "Cancelar"
        });

        if (!confirm.isConfirmed) return;
        eliminarUnasprint(idSprint)
        try {
            await deleteSprintController(idSprint);
            Swal.fire("Eliminado", "El sprint se eliminó correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevasprint(estadoPrevio)
            console.log("Algo salió mal al editar")
        }
    }


    return {
        getTask,
        editTask,
        createSprint,
        deleteSprint,
        sprints
    }
}
