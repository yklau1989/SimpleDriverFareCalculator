export interface CalculatedRecordListState {
    isLoading: boolean;
    calculatedRecords: CalculatedRecordObject[];
}

export interface CalculatedResultObject {
    driverId: number;
    name: string;
    surname: string;
    email: string;
    resultOfThatTime: number;
}

export interface CalculatedRecordObject {
    recordId: number;
    recordTime: string;
    inputString: string;
    calculatedResults: CalculatedResultObject[];
}

interface CalculatedRecordListActionLoading {
    type: "CALCULATEDRECORD_LIST_LOADING";
}
interface CalculatedRecordListActionSuccess {
    type: "CALCULATEDRECORD_LIST_SUCCESS";
    calculatedRecords: CalculatedRecordObject[];
}
interface CalculatedRecordListActionError {
    type: "CALCULATEDRECORD_LIST_ERROR";
}

type KnownAction =
    | CalculatedRecordListActionLoading
    | CalculatedRecordListActionSuccess
    | CalculatedRecordListActionError

export const calculatedRecordListReducer = (state: CalculatedRecordListState, action: KnownAction): CalculatedRecordListState => {
    switch (action.type) {
        case "CALCULATEDRECORD_LIST_LOADING":
            return {
                isLoading: true,
                calculatedRecords: []
            }
        case "CALCULATEDRECORD_LIST_SUCCESS":
            return {
                isLoading: false,
                calculatedRecords: action.calculatedRecords,
            }
        case "CALCULATEDRECORD_LIST_ERROR":
            return {
                isLoading: false,
                calculatedRecords: []
            }
    }
}