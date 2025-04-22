import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { taskStore } from "../../../../store/taskStore";
import styles from "./ModalTask.module.css";
import { ITask } from "../../../../types/ITask";
import { useTask } from "../../../../hooks/useTasks";
import { v4 as uuidv4 } from "uuid";
import { ICreateTask } from "../../../../types/ICreateTask";

type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ICreateTask = {
  titulo: "",
  descripcion: "",
  estado: "",
  fechaLimite: "",
};

export const ModalTask: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = taskStore((state) => state.tareaActiva);

  const setTareaActiva = taskStore((state) => state.setTareaActiva);

  const { createTask, editTask } = useTask();

  const [formValues, setFormValues] = useState<ICreateTask>(initialState);

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva);
    } else {
      setFormValues((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tareaActiva) {
      const taskEdited: ITask = { ...tareaActiva, ...formValues };
      editTask(taskEdited);
    } else {
      createTask(formValues);
    }

    setTareaActiva(null);
    handleCloseModal();
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div className={styles.container}>
          <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.InputContainer}>
            <input
              className={styles.input}
              placeholder="Ingrese un título"
              type="text"
              required
              onChange={handleChange}
              value={formValues.titulo}
              autoComplete="off"
              name="titulo"
            />

            <textarea
              className={styles.input + " " + styles.inputTextarea}
              placeholder="Ingrese una descripción"
              required
              onChange={handleChange}
              value={formValues.descripcion}
              name="descripcion"
            ></textarea>

            <input
              className={styles.input + " " + styles.inputDate}
              type="date"
              required
              onChange={handleChange}
              value={formValues.fechaLimite}
              autoComplete="off"
              name="fechaLimite"
            />
          </div>

          <div className={styles.buttonCard}>
            <button
              style={{ background: "#f00" }}
              className={styles.buttonModalTask}
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              style={{ background: "#00B300" }}
              className={styles.buttonModalTask}
              type="submit"
            >
              {tareaActiva ? "Guardar" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
