import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { taskStore } from "../../../../store/taskStore";
import { useTask } from "../../../../hooks/useTasks";
import { ITask } from "../../../../types/ITask";
import styles from "./ModalTaskSprint.module.css";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useSprint } from "../../../../hooks/useSprint";
type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ITask = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
  id: "",
  estado: "",
  color: "",
};

export const ModalTaskSprint: FC<IModal> = ({ handleCloseModal }) => {
  const sprintActiva = sprintStore((state) => state.sprintActiva);
  const tareaActiva = taskStore((state) => state.tareaActiva);
  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const { moveTaskToBacklog } = useTask();
  const { editTaskSprint } = useSprint();

  const [formValues, setFormValues] = useState<ITask>(initialState);

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva);
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
    try {
      if (sprintActiva && tareaActiva) {
        await moveTaskToBacklog(tareaActiva.id, sprintActiva.id);
        setTareaActiva(null);
        handleCloseModal();
      } else {
        console.log("sprint activa no encontrada");
      }
    } catch (error) {
      console.error("Error al mover una tarea al backlog");
    }
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleButtonClose = () => {
    setTareaActiva(null);
    handleCloseModal();
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
              className={
                formValues.estado === "pendiente"
                  ? styles.activeStatus
                  : styles.inactiveStatus
              }
              type="button"
              onClick={() => handleStatusChange("pendiente")}
            >
              Tarea Pendiente
            </button>
            <button
              className={
                formValues.estado === "en proceso"
                  ? styles.activeStatus
                  : styles.inactiveStatus
              }
              type="button"
              onClick={() => handleStatusChange("en proceso")}
            >
              Tarea en proceso
            </button>
            <button
              className={
                formValues.estado === "completada"
                  ? styles.activeStatus
                  : styles.inactiveStatus
              }
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
                onClick={handleButtonClose}
              >
                Cancelar
              </button>

              <button
                type="button"
                style={{ background: "#f00" }}
                className={styles.buttonModalTask}
                onClick={handleDelete}
              >
                Devolver al Backlog
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
