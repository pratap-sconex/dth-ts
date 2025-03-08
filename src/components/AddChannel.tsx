import Channel from '../models/Channel';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAddChannelActionThunk } from "../redux/channels/channelThunk";
import { createWaitForChannelAction } from '../redux/channels/channelActions';

import { ChannelReducerState, ChannelStateStatus } from "../redux/channels/channelReducer";
import { StoreState } from '../redux/store';
import MsgBox from "./MsgBox";

const AddChannel = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Channel>({ mode: "onChange" });

  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  let { msg, status } = useSelector<StoreState, ChannelReducerState>(
    (state: StoreState) => state.channelsState
  )

  const formSubmitted = async (data: Channel) => {
    dispatch(createAddChannelActionThunk(data));
    reset();
    dispatch(createWaitForChannelAction("Adding Channel, Plz wait..."))
    setTimeout(() => {
      navigate("/channels");
    }, 2000)
  }

  return (
    <div className="container mt-4">
      <h2>Add Channels</h2>
      <div className="card">
        {
          msg ? <MsgBox msg={msg} msgType={status === ChannelStateStatus.WORK_IN_PROGRESS ? "info" : "err"} /> :
            <div className="card-body">
              <form onSubmit={handleSubmit(formSubmitted)} autoComplete='off'>
                <div className="mb-3">
                  <label htmlFor="channelName" className="form-label">Channel Name</label>
                  <input type="text" className="form-control" id="channelName" {...register("name", { required: "Channel Name cant be empty" })} />
                  <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="channelPrice" className="form-label">Price</label>
                  <input type="number" className="form-control" id="channelPrice" {...register("price", { required: "Price cant be empty" })} />
                  <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="channelCategory" className="form-label">Category</label>
                  <select className="form-select" id="channelCategory" {...register("category.name", { required: "Category cant be empty" })}>
                    <option value="">Select Category</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                    <option value="news">News</option>
                    <option value="movies">Movies</option>
                  </select>
                  <p className="text-danger">{errors.category?.name?.message}</p>
                </div>
                <button type="submit" className="btn btn-primary">Add Channel</button>
              </form>
            </div>
        }
      </div>
    </div >
  );
};

export default AddChannel; 