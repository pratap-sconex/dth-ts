import { UnknownAction } from "@reduxjs/toolkit";
import Plans from "../../models/Plan";

export const WAIT: string = "WAIT";
export const ERR: string = "ERR";
export const REFRESH: string = "REFRESH PLANS";

export interface PlansAction extends UnknownAction {
    payload?: Plans[] | string;
}

export const createWaitForPlanAction = (msg: string): PlansAction => ({ type: WAIT, payload: msg });
export const createErrForPlanAction = (msg: string): PlansAction => ({ type: ERR, payload: msg });
export const createRefreshPlanAction = (plans: Plans[]): PlansAction => ({ type: REFRESH, payload: plans });