import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos de react-datepicker
import styles from "./ModalSprint.module.css";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useSprint } from "../../../../hooks/useSprint";
import { ICreateSprint } from "../../../../types/ICreateSprint";

type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ICreateSprint = {
  fechaInicio: "",
  fechaCierre: "",
  nombre: "",
};

export const ModalSprint: FC<IModal> = ({ handleCloseModal }) => {
  const sprintModalActiva = sprintStore((state) => state.sprintModalActiva);

  const setSprintModalActiva = sprintStore(
    (state) => state.setSprintModalActiva
  );

  const { createSprint, editSprint } = useSprint();

  const [formValues, setFormValues] = useState<ICreateSprint>(initialState);

  useEffect(() => {
    if (sprintModalActiva) {
      setFormValues({
        fechaInicio: sprintModalActiva.fechaInicio,
        fechaCierre: sprintModalActiva.fechaCierre,
        nombre: sprintModalActiva.nombre,
      });
    }
  }, [sprintModalActiva]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleDateChange = (
    date: Date | null,
    field: "fechaInicio" | "fechaCierre"
  ) => {
    if (date) {
      setFormValues((prev) => ({
        ...prev,
        [field]: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (new Date(formValues.fechaInicio) >= new Date(formValues.fechaCierre)) {
      alert("La fecha de cierre debe ser posterior a la fecha de inicio.");
      return;
    }

    try {
      if (sprintModalActiva) {
        const sprint = { ...sprintModalActiva, ...formValues };
        await editSprint(sprint);
      } else {
        await createSprint(formValues);
      }
      setSprintModalActiva(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el sprint:", error);
      alert("Ocurrió un error al guardar el sprint. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div className={styles.container}>
          <h3>{sprintModalActiva ? "Editar Sprint" : "Crear Sprint"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.InputContainer}>
            <div className={styles.inputTitleContainer}>
              <label htmlFor="nombre">Titulo: </label>
              <input
                className={styles.input}
                placeholder="Ingrese un título"
                type="text"
                required
                onChange={handleChange}
                value={formValues.nombre}
                autoComplete="off"
                name="nombre"
                aria-label="Título del sprint"
              />
            </div>
            <div>
              <label htmlFor="fechaInicio">Fecha de Inicio:</label>
              <DatePicker
                selected={
                  formValues.fechaInicio
                    ? new Date(formValues.fechaInicio)
                    : null
                }
                onChange={(date) => handleDateChange(date, "fechaInicio")}
                dateFormat="yyyy-MM-dd"
                className={styles.input}
                placeholderText="Seleccione una fecha"
                aria-label="Fecha de inicio del sprint"
              />
            </div>

            <div>
              <label htmlFor="fechaCierre">Fecha de Cierre:</label>
              <DatePicker
                selected={
                  formValues.fechaCierre
                    ? new Date(formValues.fechaCierre)
                    : null
                }
                onChange={(date) => handleDateChange(date, "fechaCierre")}
                dateFormat="yyyy-MM-dd"
                className={styles.input}
                placeholderText="Seleccione una fecha"
                aria-label="Fecha de cierre del sprint"
              />
            </div>
          </div>

          <div className={styles.buttonCard}>
            <button
              className={`${styles.buttonModalTask} ${styles.buttonCancel}`}
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              className={`${styles.buttonModalTask} ${styles.buttonSubmit}`}
              type="submit"
            >
              {sprintModalActiva ? "Guardar" : "Crear sprint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
