import React, { useEffect, useReducer } from "react";
import { TaxiDriverObject } from "../store/TaxiDriverListStore";
import * as TaxiDriverListStore from "../store/TaxiDriverListStore";
import BootstrapTable from "react-bootstrap-table-next";


export interface TaxiDriverListProps {
    inRefreshFlag: boolean;
    selectedCallback: (driver: TaxiDriverObject) => void;
}

const TaxiDriverList = ({ inRefreshFlag, selectedCallback }: TaxiDriverListProps) => {
    useEffect(() => {
        if (inRefreshFlag)
            GetList();
    }, [inRefreshFlag]);

    const [taxiDriverListActionState, dispatch] = useReducer(TaxiDriverListStore.taxiDriverListReducer, { isLoading: false, taxiDrivers: [] });

    const GetList = () => {
        dispatch({ type: "TAXIDRIVER_LIST_LOADING" });

        fetch("/api/TaxiDriver/", {
            method: "GET",
            // body: JSON.stringify(sampleJson),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json() as Promise<TaxiDriverObject[]>)
            .then((data) => {
                if (data.length > 0) {
                    // console.log(data);
                    dispatch({ type: "TAXIDRIVER_LIST_SUCCESS", taxiDrivers: data });
                } else {
                    dispatch({ type: "TAXIDRIVER_LIST_SUCCESS", taxiDrivers: [] });
                }
            })
            .catch((error) => {
                dispatch({ type: "TAXIDRIVER_LIST_ERROR" });
            });
    }

    const columns = [{ dataField: "name", text: "Name" },
        { dataField: "surname", text: "Surname" },
        { dataField: "email", text: "Email" },
        { dataField: "baseFarePrice", text: "Base Fare Price" },
        { dataField: "baseFareDistance", text: "Base Fare Distance" }];
    const selectRowProp: any = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF"
    };
    const rowEvents = {
        onClick: (e: any, row: TaxiDriverObject, rowIndex: number) => {
            // console.log(row);
            selectedCallback(row);
        }
    }

    return (
        <>
            <BootstrapTable
                keyField="id"
                bootstrap4
                columns={columns}
                data={taxiDriverListActionState.taxiDrivers}
                rowEvents={rowEvents}
                selectRow={selectRowProp}
            />
        </>
    )
}

export default TaxiDriverList;