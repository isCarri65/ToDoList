import axios from "axios"
import { API_URL } from "../utils/constantes"
import { ISprintList } from "../types/ISprintList"
import { ISprint } from "../types/ISprint"

export const putSprintList = async(sprints: ISprint[])=>{
  try{
    
    const response = await axios.put<ISprintList>(`${API_URL}/sprintList`, {sprints: sprints})
    return response.data

  } catch (error) {
    throw new Error("Error al intentar actulizar el sprintList")
  }
}
