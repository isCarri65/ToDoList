import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { taskStore } from "../../../../store/taskStore";
import { useTask } from "../../../../hooks/useTasks";
import { ITask } from "../../../../types/ITask";
import { ICreateTask } from "../../../../types/ICreateTask";
import { v4 as uuidv4 } from "uuid";
import styles from "./ModalTaskSprint.module.css";
import { updateTareaSprintController } from "../../../../data/tareaController";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useSprint } from "../../../../hooks/useSprint";
type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ICreateTask = {
  titulo: "",
  descripcion: "",
  estado: "to-do",
  fechaLimite: "",
};

export const ModalTaskSprint: FC<IModal> = ({ handleCloseModal }) => {
  const sprintActiva = sprintStore((state) => state.sprintActiva);
  const tareaActiva = taskStore((state) => state.tareaActiva);
  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const { createTask, deleteTask } = useTask();
  const { editTaskSprint } = useSprint();

  const [formValues, setFormValues] = useState<ICreateTask>(initialState);

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva);
    } else {
      setFormValues((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, [tareaActiva]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (estado: string) => {
    setFormValues((prev) => ({ ...prev, estado }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (tareaActiva && sprintActiva) {
      const taskEdited: ITask = { ...tareaActiva, ...formValues };
      console.log(taskEdited);
      await editTaskSprint(taskEdited, sprintActiva.id);
    }

    setTareaActiva(null);
    handleCloseModal();
  };

  const handleDelete = async () => {
    if (tareaActiva) {
      await deleteTask(tareaActiva.id);
      setTareaActiva(null);
      handleCloseModal();
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.containerPrincipalModal} onClick={handleCloseModal}>
      <div className={styles.contentPopUp} onClick={handleModalClick}>
        <form className={styles.taskInfo} onSubmit={handleSubmit}>
          <div className={styles.inputsInfo}>
            <label>
              <strong>Nombre Tarea:</strong>
              <input
                type="text"
                name="titulo"
                value={formValues.titulo}
                className={styles.input}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <strong>Descripción:</strong>
              <textarea
                name="descripcion"
                value={formValues.descripcion}
                className={styles.input}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <strong>Fecha de Entrega:</strong>
              <input
                type="date"
                name="fechaLimite"
                className={styles.input}
                value={formValues.fechaLimite}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.statusSection}>
            <h3>Etiquetas</h3>
            <button
              className={""}
              type="button"
              onClick={() => handleStatusChange("pendiente")}
            >
              Tarea Pendiente
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("en proceso")}
            >
              Tarea en proceso
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("completada")}
            >
              Tarea completa
            </button>

            <div className={styles.buttonCard}>
              <button
                type="button"
                style={{ background: "#f00" }}
                className={styles.buttonModalTask}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                style={{ background: "#f00" }}
                className={styles.buttonModalTask}
                onClick={handleDelete}
              >
                Eliminar
              </button>

              <button
                type="submit"
                style={{ background: "#00B300" }}
                className={styles.buttonModalTask}
              >
                Aplicar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
