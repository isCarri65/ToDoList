import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalSprint.module.css";
import { ISprint } from "../../../../types/ISprint";
import { sprintStore } from "../../../../store/sprintBackLogStore";
import { useSprint } from "../../../../hooks/useSprint";
import { v4 as uuidv4 } from 'uuid';


type IModal = {
    handleCloseModal: VoidFunction
}

const initialState:ISprint = {
    fechaInicio: '',
    fechaCierre: '',
    nombre: '',
}

export const ModalSprint: FC<IModal> = ({handleCloseModal}) => {

    const sprintActiva = sprintStore((state) => state.sprintActiva)

    const setsprintActiva = sprintStore((state) => state.setsprintActiva)

    const {createSprint, editTask} = useSprint()

    const [formValues, setFormValues] = useState<ISprint>(initialState)

    useEffect(() => {
        if(sprintActiva){
            setFormValues(sprintActiva)
        } else {
            setFormValues(prev => ({ ...prev, id: uuidv4() }));
        };
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,value} = e.target

        setFormValues((prev) => ({...prev, [`${name}`]:value}))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(sprintActiva) {
            editTask(formValues)
        }
        else {
            createSprint({...formValues, id: formValues.id || uuidv4() })
        }

        setsprintActiva(null)
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div className={styles.container}>
                    <h3>{sprintActiva ? "Editar Sprint" : "Crear Sprint"}</h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div className={styles.InputContainer}  >
                        <input className={styles.input} placeholder="Ingrese un título" type="text" required onChange={handleChange} value={formValues.nombre} autoComplete="off" name="nombre"/>
                        
                        <input className={styles.input} type="date" required onChange={handleChange} value={formValues.fechaInicio} autoComplete="off" name="fechaInicio"/>


                        <input className={styles.input} type="date" required onChange={handleChange} value={formValues.fechaCierre} autoComplete="off" name="fechaCierre"/>
                    </div>

                    <div className={styles.buttonCard}>
                        <button className={styles.buttonModalTask} onClick={handleCloseModal}>Cancelar</button>

                        <button className={styles.buttonModalTask} type="submit">{sprintActiva ? "Editar sprint" : "Crear sprint"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
