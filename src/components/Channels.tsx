import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import { createDeleteChannelActionThunk, createLoadChannelsActionThunk } from "../redux/channels/channelThunk";
import { ChannelReducerState, ChannelStateStatus } from "../redux/channels/channelReducer";
import MsgBox from "./MsgBox";

const Channels = () => {

    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(createLoadChannelsActionThunk());
    }, [])

    let { channels, msg, status } = useSelector<StoreState, ChannelReducerState>(
        (state: StoreState) => state.channelsState
    )

    const del = (id: string) => {
        dispatch(createDeleteChannelActionThunk(id));
    }

    return (
        <>
            <h3 className='text-center mt-5 mb-5 fw-bold'>Channels</h3>
            <div className='mx-5'>
                {
                    msg ? <MsgBox msg={msg} msgType={status === ChannelStateStatus.WORK_IN_PROGRESS ? "info" : "err"} /> :
                        channels && channels.length === 0 ? (<h5>No Channels</h5>) :
                            < table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Channel Name</th>
                                        <th scope="col">Cateogry</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        channels?.map(channel => (
                                            <tr key={channel.id}>
                                                <td>{channel.id}</td>
                                                <td>{channel.name}</td>
                                                <td>{channel.category.name}</td>
                                                <td>{channel.price}</td>
                                                <td><button onDoubleClick={() => del(channel.id)}><i className="bi bi-trash"></i></button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                }
            </div >
        </>
    )
}

export default Channels;