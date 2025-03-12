import Plans from '../models/Plan';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWaitForPlanAction } from '../redux/plans/planActions';
import { createAddPlanActionThunk } from "../redux/plans/planThunk";

import { PlansReducerState, PlansStateStatus } from "../redux/plans/planReducer";
import { StoreState } from '../redux/store';
import MsgBox from "./MsgBox";
import Plan from '../models/Plan';

const AddPlan = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Plans>({ mode: "onChange" });

  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  let { msg, status } = useSelector<StoreState, PlansReducerState>(
    (state: StoreState) => state.plansState
  )

  const formSubmitted = async (data: Plan) => {
    dispatch(createAddPlanActionThunk(data));
    reset();
    dispatch(createWaitForPlanAction("Adding a Plan, Plz wait..."))
    setTimeout(() => {
      navigate("/plans");
    }, 2000)
  }

  return (
    <div className="container mt-4">
      <h2>Add a Plan</h2>
      <div className="card">
        {
          msg ? <MsgBox msg={msg} msgType={status === PlansStateStatus.WORK_IN_PROGRESS ? "info" : "err"} /> :
            <div className="card-body">
              <form onSubmit={handleSubmit(formSubmitted)} autoComplete='off'>
                <div className="mb-3">
                  <label htmlFor="planName" className="form-label">Plan Name</label>
                  <input type="text" className="form-control" id="planName" {...register("name", { required: "Plan Name cant be empty" })} />
                  <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="channelPrice" className="form-label">Price</label>
                  <input type="number" className="form-control" id="planPrice" {...register("price", { required: "Price cant be empty" })} />
                  <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="planDuration" className="form-label">Duration</label>
                  <select className="form-select" id="planDuration" {...register("duration", { required: "Duration cant be empty" })}>
                    <option value="">Duration</option>
                    <option value="1 month">1 month</option>
                    <option value="2 month">2 month</option>
                    <option value="3 month">3 month</option>
                    <option value="4 month">4 month</option>
                  </select>
                  <p className="text-danger">{errors.duration?.message}</p>
                </div>
                <button type="submit" className="btn btn-primary">Add Plan</button>
              </form>
            </div>
        }
      </div>
    </div >
  );
};

export default AddPlan; 