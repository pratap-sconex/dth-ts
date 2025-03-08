import Channel from "../../models/Channel";
import { ChannelAction, WAIT, ERR, REFRESH } from "./channelActions";

export interface ChannelReducerState {
    channels?: Channel[];
    msg?: string;
    status: ChannelStateStatus;
}

export enum ChannelStateStatus {
    READY, WORK_IN_PROGRESS, ERROR
}

let initailState: ChannelReducerState = { status: ChannelStateStatus.READY };

export const channelReducer = (state: ChannelReducerState = initailState, action: ChannelAction): ChannelReducerState => {
    let { channels, msg, status } = state;

    let { type, payload } = action;

    switch (type) {
        case WAIT:
            msg = payload as string;
            status = ChannelStateStatus.WORK_IN_PROGRESS;
            break;
        case ERR:
            msg = payload as string;
            status = ChannelStateStatus.ERROR;
            break;
        case REFRESH:
            msg = undefined;
            status = ChannelStateStatus.READY;
            channels = payload as Channel[];
            break;
        default:
            channels = payload as Channel[];
    }

    return { channels, msg, status };
}