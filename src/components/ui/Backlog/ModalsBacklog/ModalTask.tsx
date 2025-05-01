import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos de react-datepicker
import { taskStore } from "../../../../store/taskStore";
import styles from "./ModalTask.module.css";
import { ITask } from "../../../../types/ITask";
import { useTask } from "../../../../hooks/useTasks";
import { ICreateTask } from "../../../../types/ICreateTask";

type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ICreateTask = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const ModalTask: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = taskStore((state) => state.tareaActiva);

  const setTareaActiva = taskStore((state) => state.setTareaActiva);

  const { createTask, editTask } = useTask();

  const [formValues, setFormValues] = useState<ICreateTask>(initialState);

  useEffect(() => {
    if (tareaActiva) {
      setFormValues({
        titulo: tareaActiva.titulo,
        descripcion: tareaActiva.descripcion,
        fechaLimite: tareaActiva.fechaLimite,
      });
    }
  }, [tareaActiva]); // Agregado tareaActiva como dependencia

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormValues((prev) => ({
        ...prev,
        fechaLimite: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (tareaActiva) {
        const taskEdited: ITask = { ...tareaActiva, ...formValues };
        editTask(taskEdited);
      } else {
        createTask(formValues);
      }

      setTareaActiva(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert("Ocurrió un error al guardar la tarea. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div className={styles.container}>
          <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.InputsContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="titulo">Titulo: </label>
              <input
                className={styles.input}
                placeholder="Ingrese un título"
                type="text"
                required
                onChange={handleChange}
                value={formValues.titulo}
                autoComplete="off"
                name="titulo"
                aria-label="Título de la tarea" // Mejora de accesibilidad
              />
            </div>
            <div className={styles.inputTextareaContainer}>
              <label htmlFor="descripcion">Descripcion: </label>
              <textarea
                className={`${styles.input} ${styles.inputTextarea}`} // Concatenación de clases mejorada
                placeholder="Ingrese una descripción"
                onChange={handleChange}
                value={formValues.descripcion}
                name="descripcion"
                aria-label="Descripción de la tarea" // Mejora de accesibilidad
              ></textarea>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="fechaLimite">Fecha Límite: </label>
              <DatePicker
                selected={
                  formValues.fechaLimite
                    ? new Date(formValues.fechaLimite)
                    : null
                }
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className={styles.input}
                placeholderText="Seleccione una fecha"
                aria-label="Fecha límite de la tarea" // Mejora de accesibilidad
              />
            </div>
          </div>

          <div className={styles.buttonCard}>
            <button
              className={`${styles.buttonModalTask} ${styles.buttonCancel}`} // Estilo movido a CSS
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              className={`${styles.buttonModalTask} ${styles.buttonSubmit}`} // Estilo movido a CSS
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
