import axios from "axios"
import { API_URL } from "../utils/constantes"
import { IBacklog } from "../types/IBacklog"
import { ITarea } from "../types/ITarea"

export const putBacklog = async(tareas: ITarea[])=>{
  try{
    
    const response = await axios.put<IBacklog>(`${API_URL}/backlog`, {tareas: tareas})
    return response.data

  } catch (error) {
    throw new Error("Error al intentar actulizar el Backlog")
  }
}
