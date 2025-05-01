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
import { updateTareaController } from "../data/tareaController";
import { handleAxiosError } from "../utils/handleAxiosError";

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
    try {
      const data = await getSprintsController();
      if (!data) {
        setArraysprints([]);
      } else {
        setArraysprints(data);
      }
    } catch (error) {
      const message = handleAxiosError(error);
      console.error("Error al obtener sprints: ", message);
    }
  };

  const getSprintById = async (id: string) => {
    try {
      const sprint = await getSprintByIdController(id);
      return sprint;
    } catch (error) {
      const message = handleAxiosError(error);
      console.error("Error al obtener sprint por id: ", message);
    }
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
      await updateTareaController(taskEdited);
      const updatedSprint = await getSprintByIdController(idSprint);
      if (updatedSprint) setSprintActiva(updatedSprint);
    } catch (error) {
      console.error(
        "Error al editar una tarea y traer el sprint actulizado ",
        error
      );
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
      console.error("Error al eliminar una sprint ", error);
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
