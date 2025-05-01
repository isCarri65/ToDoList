import axios, { AxiosError } from "axios";

/**
 * Maneja errores de Axios de forma centralizada.
 */
export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    const message =
      axiosError.response?.data?.message || // Mensaje enviado por tu backend
      axiosError.response?.statusText || // Texto del status (ej: "Not Found")
      axiosError.message || // Mensaje genérico de Axios
      "Error desconocido al conectar con el servidor.";

    return message;
  } else {
    return "Error inesperado en el cliente.";
  }
};
