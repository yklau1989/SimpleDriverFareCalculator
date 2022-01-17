export interface TaxiDriverListState {
    isLoading: boolean;
    taxiDrivers: TaxiDriverObject[];
}

export interface TaxiDriverObject {
    id: number;
    name: string;
    surname: string;
    email: string;
    vehicleType: number;
    baseFarePrice: string;
    baseFareDistance: string;
}

interface TaxiDriverListActionLoading {
    type: "TAXIDRIVER_LIST_LOADING";
}
interface TaxiDriverListActionSuccess {
    type: "TAXIDRIVER_LIST_SUCCESS";
    taxiDrivers: TaxiDriverObject[];
}
interface TaxiDriverListActionError {
    type: "TAXIDRIVER_LIST_ERROR";
}

type KnownAction =
    | TaxiDriverListActionLoading
    | TaxiDriverListActionSuccess
    | TaxiDriverListActionError

export const taxiDriverListReducer = (state: TaxiDriverListState, action: KnownAction): TaxiDriverListState => {
    switch (action.type) {
        case "TAXIDRIVER_LIST_LOADING":
            return {
                isLoading: true,
                taxiDrivers: []
            }
        case "TAXIDRIVER_LIST_SUCCESS":
            return {
                isLoading: false,
                taxiDrivers: action.taxiDrivers,
            }
        case "TAXIDRIVER_LIST_ERROR":
            return {
                isLoading: false,
                taxiDrivers: []
            }
    }
}