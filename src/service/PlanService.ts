import axios, { AxiosResponse } from "axios";
import Plan from "../models/Plan";

const URL = import.meta.env.VITE_CHANNELS_API_URL

export default class PlanService {
    getPlans = (): Promise<AxiosResponse<Plan[]>> => axios.get<Plan[]>(URL);
    deletePlansById = (id: string): Promise<AxiosResponse<void>> => axios.delete<void>(`${URL}/${id}`);
    addPlans = (plan: Plan): Promise<AxiosResponse<Plan>> => axios.post<Plan>(URL, plan);
}