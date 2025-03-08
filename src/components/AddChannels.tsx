import ChannelService from "../service/ChannelService";
import Channel from '../models/Channel';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddChannels = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Channel>({ mode: "onChange" });

  const navigate = useNavigate();

  const formSubmitted = async (data: Channel) => {
    try {
      const service = new ChannelService();
      const response = await service.addChannel(data);
      if (response.status === 201) {
        reset();
        navigate("/channels");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Add Channels</h2>
      <div className="card">
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
      </div>
    </div >
  );
};

export default AddChannels; 