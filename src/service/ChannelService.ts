import axios, { AxiosResponse } from "axios";
import Channel from "../models/Channel";

const URL = import.meta.env.VITE_CHANNELS_API_URL

export default class ChannelService {
    getChannels = (): Promise<AxiosResponse<Channel[]>> => axios.get<Channel[]>(URL);
    deleteChannelById = (id: string): Promise<AxiosResponse<void>> => axios.delete<void>(`${URL}/${id}`);
    addChannel = (channel: Channel): Promise<AxiosResponse<Channel>> => axios.post<Channel>(URL, channel);
}