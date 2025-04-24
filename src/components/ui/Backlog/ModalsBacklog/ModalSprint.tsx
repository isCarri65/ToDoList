import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalSprint.module.css";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useSprint } from "../../../../hooks/useSprint";
import { v4 as uuidv4 } from "uuid";
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
      setFormValues(sprintModalActiva);
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
    if (sprintModalActiva) {
      editSprint({
        ...formValues,
        id: sprintModalActiva.id,
        tareas: sprintModalActiva.tareas,
      });
    } else {
      createSprint(formValues);
    }
    setSprintModalActiva(null);
    handleCloseModal();
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div className={styles.container}>
          <h3>{sprintModalActiva ? "Editar Sprint" : "Crear Sprint"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.InputContainer}>
            <input
              className={styles.input}
              placeholder="Ingrese un título"
              type="text"
              required
              onChange={handleChange}
              value={formValues.nombre}
              autoComplete="off"
              name="nombre"
            />

            <input
              className={styles.input + " " + styles.inputDate}
              type="date"
              required
              onChange={handleChange}
              value={formValues.fechaInicio}
              autoComplete="off"
              name="fechaInicio"
            />

            <input
              className={styles.input + " " + styles.inputDate}
              type="date"
              required
              onChange={handleChange}
              value={formValues.fechaCierre}
              autoComplete="off"
              name="fechaCierre"
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
              {sprintModalActiva ? "Guardar" : "Crear sprint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
