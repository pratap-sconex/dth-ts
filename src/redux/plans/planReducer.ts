import Plan from "../../models/Plan";
import { PlansAction, WAIT, ERR, REFRESH } from "./planActions";

export interface PlansReducerState {
    plans?: Plan[];
    msg?: string;
    status: PlansStateStatus;
}

export enum PlansStateStatus {
    READY, WORK_IN_PROGRESS, ERROR
}

let initailState: PlansReducerState = { status: PlansStateStatus.READY };

export const plansReducer = (state: PlansReducerState = initailState, action: PlansAction): PlansReducerState => {
    let { plans, msg, status } = state;

    let { type, payload } = action;

    switch (type) {
        case WAIT:
            msg = payload as string;
            status = PlansStateStatus.WORK_IN_PROGRESS;
            break;
        case ERR:
            msg = payload as string;
            status = PlansStateStatus.ERROR;
            break;
        case REFRESH:
            msg = undefined;
            status = PlansStateStatus.READY;
            plans = payload as Plan[];
            break;
        default:
            plans = payload as Plan[];
    }

    return { plans, msg, status };
}