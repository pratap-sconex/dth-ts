import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import ChannelService from "../../service/ChannelService";
import { AxiosResponse } from "axios";
import { StoreState } from "../store";
import { ChannelAction, createErrForChannelAction, createRefreshChannelAction, createWaitForChannelAction } from "./channelActions";
import Channel from "../../models/Channel";

//thunk action creators

const channelService: ChannelService = new ChannelService();

export const createLoadChannelsActionThunk = (): ThunkAction<void, StoreState, unknown, UnknownAction> => async (dispatch) => {
    dispatch(createWaitForChannelAction("Please wait while loading data...!"));
    try {
        let resp: AxiosResponse<Channel[]> = await channelService.getChannels();
        dispatch(createRefreshChannelAction(resp.data));
    } catch (exception: any) {
        console.error(exception);
        dispatch(createErrForChannelAction("Sorry! Unable to process the requested action! Please retry later!"));
    }
}

export const createAddChannelActionThunk = (channel: Channel): ThunkAction<void, StoreState, unknown, ChannelAction> => async (dispatch) => {
    dispatch(createWaitForChannelAction("Please wait while adding data...!"));
    try {
        await channelService.addChannel(channel);
        dispatch(createLoadChannelsActionThunk());
    } catch (exception: any) {
        console.error(exception);
        dispatch(createErrForChannelAction("Sorry! Unable to process the requested action! Please retry later!"));
    }
};

export const createDeleteChannelActionThunk = (id: string): ThunkAction<void, StoreState, unknown, ChannelAction> => async (dispatch) => {
    dispatch(createWaitForChannelAction("Please wait while deleting data...!"));
    try {
        await channelService.deleteChannelById(id);
        dispatch(createLoadChannelsActionThunk());
    } catch (exception: any) {
        console.error(exception);
        dispatch(createWaitForChannelAction("Sorry! Unable to process the requested action! Please retry later!"));
    }
};