import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import PlanService from "../../service/PlanService";
import { AxiosResponse } from "axios";
import { StoreState } from "../store";
import { PlansAction, createErrForPlanAction, createRefreshPlanAction, createWaitForPlanAction } from "./planActions";
import Plan from "../../models/Plan";

//thunk action creators

const planService: PlanService = new PlanService();

export const createLoadPlansActionThunk = (): ThunkAction<void, StoreState, unknown, UnknownAction> => async (dispatch) => {
    dispatch(createWaitForPlanAction("Please wait while loading data...!"));
    setTimeout(async () => {
        try {
            let resp: AxiosResponse<Plan[]> = await planService.getPlans();//doudt
            dispatch(createRefreshPlanAction(resp.data));
        } catch (exception: any) {
            console.error(exception);
            dispatch(createErrForPlanAction("Sorry! Unable to process the requested action! Please retry later!"));
        }
    }, 2000)
}

export const createAddPlanActionThunk = (plans: Plan): ThunkAction<void, StoreState, unknown,PlansAction> => async (dispatch) => {
    dispatch(createWaitForPlanAction("Please wait while adding data...!"));
    setTimeout(async () => {
        try {
            await planService.addPlans(plans);
            dispatch(createLoadPlansActionThunk());
        } catch (exception: any) {
            console.error(exception);
            dispatch(createErrForPlanAction("Sorry! Unable to process the requested action! Please retry later!"));
        }
    }, 2000)
};

export const createDeletePlanActionThunk = (id: string): ThunkAction<void, StoreState, unknown,PlansAction> => async (dispatch) => {
    dispatch(createWaitForPlanAction("Please wait while deleting data...!"));
    try {
        await planService.deletePlansById(id);
        dispatch(createLoadPlansActionThunk());
    } catch (exception: any) {
        console.error(exception);
        dispatch(createWaitForPlanAction("Sorry! Unable to process the requested action! Please retry later!"));
    }
};