"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxiDriverListReducer = void 0;
var taxiDriverListReducer = function (state, action) {
    switch (action.type) {
        case "TAXIDRIVER_LIST_LOADING":
            return {
                isLoading: true,
                taxiDrivers: []
            };
        case "TAXIDRIVER_LIST_SUCCESS":
            return {
                isLoading: false,
                taxiDrivers: action.taxiDrivers,
            };
        case "TAXIDRIVER_LIST_ERROR":
            return {
                isLoading: false,
                taxiDrivers: []
            };
    }
};
exports.taxiDriverListReducer = taxiDriverListReducer;
//# sourceMappingURL=TaxiDriverListStore.js.map