import { useShallow } from "zustand/shallow";
import {
  createSprintController,
  deleteSprintController,
  getSprintByIdController,
  getSprintsController,
  updateSprintController,
} from "../data/sprintControllers";
import Swal from "sweetalert2";
import { sprintStore } from "../store/sprintBackLogStore";
import { ISprint } from "../types/ISprint";
import { ICreateSprint } from "../types/ICreateSprint";
import { ITask } from "../types/ITask";
import { updateTareaSprintController } from "../data/tareaController";

export const useSprint = () => {
  const {
    sprints,
    setArraysprints,
    agregarNuevasprint,
    eliminarUnasprint,
    editarUnasprint,
    setSprintActiva,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setArraysprints: state.setArraysprints,
      agregarNuevasprint: state.agregarNuevasprint,
      eliminarUnasprint: state.eliminarUnasprint,
      editarUnasprint: state.editarUnasprint,
      setSprintActiva: state.setsprintActiva,
    }))
  );

  const getSprints = async () => {
    const data = await getSprintsController();
    if (data) setArraysprints(data);
  };

  const getSprintById = async (id: string) => {
    const sprint = await getSprintByIdController(id);
    return sprint;
  };

  const createSprint = async (newSprint: ICreateSprint) => {
    try {
      const newSprintDb = await createSprintController(newSprint);
      Swal.fire("Éxito", "Sprint creada correctamente", "success");
      if (newSprintDb) agregarNuevasprint(newSprintDb);
    } catch (error) {
      console.log("Algo salió mal al crear la sprint");
    }
  };

  const editSprint = async (sprintEditada: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id);

    editarUnasprint(sprintEditada);
    try {
      await updateSprintController(sprintEditada);
      Swal.fire("Éxito", "Sprint actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnasprint(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  const editTaskSprint = async (taskEdited: ITask, idSprint: string) => {
    try {
      await updateTareaSprintController(taskEdited, idSprint);
      const updatedSprint = await getSprintByIdController(idSprint);
      setSprintActiva(updatedSprint);
    } catch (error) {
      console.log("Error al editar una tarea y traer el sprint actulizado");
    }
  };

  const deleteSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;
    eliminarUnasprint(idSprint);
    try {
      await deleteSprintController(idSprint);
      Swal.fire("Eliminado", "La sprint se eliminó correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevasprint(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  return {
    getSprints,
    editSprint,
    createSprint,
    deleteSprint,
    sprints,
    getSprintById,
    editTaskSprint,
  };
};
