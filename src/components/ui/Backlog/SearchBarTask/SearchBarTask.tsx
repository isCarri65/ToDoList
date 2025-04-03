import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useTask } from "../../../../hooks/useTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchBarTask() {
  const [task, setTask] = useState("");
  const { actionSearch, getTask } = useTask();  // Agregar getTask

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTask(value);

    // Si el input está vacío, cargar todas las tareas de nuevo
    if (value.trim() === "") {
      getTask();
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    actionSearch(task);
  };

  return (
<form onSubmit={handleSubmit} className={styles.searchbox}>
  <input
    type="text"
    value={task}
    onChange={handleChange}
    placeholder="Busca una Tarea..."
    className={styles.inputsearch}
  />
  <button className={styles.btnsearch} type="submit" disabled={!task.trim()}>
    <FontAwesomeIcon icon={faSearch} />
  </button>
</form>
  );
}

export default SearchBarTask;
