

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import { createDeletePlanActionThunk, createLoadPlansActionThunk } from "../redux/plans/planThunk";
import { PlansReducerState, PlansStateStatus } from "../redux/plans/planReducer";
import MsgBox from "./MsgBox";

const Plans = () => 
{
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(createLoadPlansActionThunk());
    }, [])

    let { plans, msg, status } = useSelector<StoreState, PlansReducerState>(
        (state: StoreState) => state.plansState
    )

    const del = (id: string) => {
        dispatch(createDeletePlanActionThunk(id));
    }

    return (
        <>
            <h3 className='text-center mt-5 mb-5 fw-bold'>Channels</h3>
            <div className='mx-5'>
                {
                    msg ? <MsgBox msg={msg} msgType={status === PlansStateStatus.WORK_IN_PROGRESS ? "info" : "err"} /> :
                        plans && plans.length === 0 ? (<h5>No plans</h5>) :
                            < table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">plan Name</th>
                                        <th scope="col">price</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        plans?.map(plan => (
                                            <tr key={plan.id}>
                                                <td>{plan.id}</td>
                                                <td>{plan.name}</td>
                                                <td>{plan.duration}</td>
                                                <td>{plan.price}</td>
                                                <td><button onDoubleClick={() => del(plan.id)}><i className="bi bi-trash"></i></button></td>
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

export default Plans;