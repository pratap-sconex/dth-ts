import { UnknownAction } from "@reduxjs/toolkit";
import Channel from "../../models/Channel";

export const WAIT: string = "WAIT";
export const ERR: string = "ERR";
export const REFRESH: string = "REFRESH CHANNELS";

export interface ChannelAction extends UnknownAction {
    payload?: Channel[] | string;
}

export const createWaitForChannelAction = (msg: string): ChannelAction => ({ type: WAIT, payload: msg });
export const createErrForChannelAction = (msg: string): ChannelAction => ({ type: ERR, payload: msg });
export const createRefreshChannelAction = (channels: Channel[]): ChannelAction => ({ type: REFRESH, payload: channels });