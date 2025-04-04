import { useShallow } from "zustand/shallow";
import {
  createSprintController,
  deleteSprintController,
  getSprintsController,
  updateSprintController,
} from "../data/sprintControllers";
import Swal from "sweetalert2";
import { sprintStore } from "../store/sprintBackLogStore";
import { ISprint } from "../types/ISprint";

export const useSprint = () => {
  const {
    sprints,
    setArraysprints,
    agregarNuevasprint,
    eliminarUnasprint,
    editarUnasprint,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setArraysprints: state.setArraysprints,
      agregarNuevasprint: state.agregarNuevasprint,
      eliminarUnasprint: state.eliminarUnasprint,
      editarUnasprint: state.editarUnasprint,
    }))
  );

  const getSprints = async () => {
    const data = await getSprintsController();
    if (data) setArraysprints(data);
  };

  const createSprint = async (newSprint: ISprint) => {
    agregarNuevasprint(newSprint);
    try {
      await createSprintController(newSprint);
      Swal.fire("Éxito", "Sprint creada correctamente", "success");
    } catch (error) {
      eliminarUnasprint(newSprint.id!);
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
  };
};
