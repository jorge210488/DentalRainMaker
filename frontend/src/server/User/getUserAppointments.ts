import { axiosInstance } from "../AxiosConfig";

export const getUserAppointments = async (userId: string, token: string) => {
    try {
        const response = await axiosInstance.get(`/appointments/user/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};