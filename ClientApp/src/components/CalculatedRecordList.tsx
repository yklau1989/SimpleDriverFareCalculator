import React, { useEffect, useReducer } from "react";
import { CalculatedRecordObject, CalculatedResultObject } from "../store/CalculatedRecordListStore";
import * as CalculatedRecordListStore from "../store/CalculatedRecordListStore";
import BootstrapTable from "react-bootstrap-table-next";
import { Col, Row } from "reactstrap";

export interface CalculatedRecordListProps {
    inRefreshFlag: boolean;
}

const CalculatedRecordList = ({ inRefreshFlag }: CalculatedRecordListProps) => {
    useEffect(() => {
        if (inRefreshFlag)
            GetList();
    }, [inRefreshFlag]);

    const [calculatedRecordListActionState, dispatch] = useReducer(CalculatedRecordListStore.calculatedRecordListReducer, { isLoading: false, calculatedRecords: [] });

    const GetList = () => {
        dispatch({ type: "CALCULATEDRECORD_LIST_LOADING" });

        fetch("/api/Calculate/", {
            method: "GET",
            // body: JSON.stringify(sampleJson),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json() as Promise<CalculatedRecordObject[]>)
            .then((data) => {
                if (data.length > 0) {
                    // console.log(data);
                    dispatch({ type: "CALCULATEDRECORD_LIST_SUCCESS", calculatedRecords: data });
                } else {
                    dispatch({ type: "CALCULATEDRECORD_LIST_SUCCESS", calculatedRecords: [] });
                }
            })
            .catch((error) => {
                dispatch({ type: "CALCULATEDRECORD_LIST_ERROR" });
            });
    }

    const columns = [
        {
            dataField: "recordTime", text: "Record Time", formatter: (cellContent: string, row: any ) => (
                <>{cellContent.substring(0, 19)}</>
            )
        },
        { dataField: "inputString", text: "Input" },
        {
            dataField: "calculatedResults", text: "Result", formatter: (cellContent: CalculatedResultObject[], row: any) => (
                <>{cellContent.map(element => (<Row key={element.driverId}><Col>{element.name}</Col><Col>{element.surname}</Col><Col>{element.email}</Col><Col>{element.resultOfThatTime}</Col></Row>))}</>
            )
        }
    ];
    const rowEvents = {
        onClick: (e: any, row: CalculatedRecordObject, rowIndex: number) => {
            // console.log(row);
        }
    }

    return (
        <div>
            <BootstrapTable
                keyField="recordId"
                bootstrap4
                columns={columns}
                data={calculatedRecordListActionState.calculatedRecords}
                rowEvents={rowEvents}
            />
        </div>
    );
}

export default CalculatedRecordList;