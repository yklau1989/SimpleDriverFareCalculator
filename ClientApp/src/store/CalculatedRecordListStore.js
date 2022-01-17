"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatedRecordListReducer = void 0;
var calculatedRecordListReducer = function (state, action) {
    switch (action.type) {
        case "CALCULATEDRECORD_LIST_LOADING":
            return {
                isLoading: true,
                calculatedRecords: []
            };
        case "CALCULATEDRECORD_LIST_SUCCESS":
            return {
                isLoading: false,
                calculatedRecords: action.calculatedRecords,
            };
        case "CALCULATEDRECORD_LIST_ERROR":
            return {
                isLoading: false,
                calculatedRecords: []
            };
    }
};
exports.calculatedRecordListReducer = calculatedRecordListReducer;
//# sourceMappingURL=CalculatedRecordListStore.js.map