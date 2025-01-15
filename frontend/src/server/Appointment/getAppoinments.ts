import { axiosInstance } from "../AxiosConfig";

export const getAppointments = async () => {
    try {
        const response = await axiosInstance.get('/appointments');
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};