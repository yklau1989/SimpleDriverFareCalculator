import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { TaxiDriverObject } from "../store/TaxiDriverListStore";
import TaxiDriverAdd from "./TaxiDriverAdd";
import TaxiDriverEdit from "./TaxiDriverEdit";
import TaxiDriverList from "./TaxiDriverList";

const TaxiDriver = () => {
    useEffect(() => {
        setRefreshListFlag(true);
    }, []);

    const [newDriverIsOpen, setNewDriverIsOpen] = useState(false);
    const newDriverAddedCallback = () => {
        setRefreshListFlag(true);
        setNewDriverIsOpen(false);
    }
    const newDriverClosedCallback = () => {
        setNewDriverIsOpen(false);
    }

    const [refreshListFlag, setRefreshListFlag] = useState(false);
    useEffect(() => {
        if (refreshListFlag)
            setRefreshListFlag(false);
    }, [refreshListFlag]);
    const selectedTaxiDriverCallback = (driver: TaxiDriverObject) => {
        // console.log(driver);
        setSelectedTaxiDriver(driver);
    }
    const [selectedTaxiDriver, setSelectedTaxiDriver] = useState<TaxiDriverObject>();


    const [editDriverIsOpen, setEditDriverIsOpen] = useState(false);
    const driverEditedCallback = () => {
        setRefreshListFlag(true);
        setEditDriverIsOpen(false);
    }
    const editDriverClosedCallback = () => {
        setEditDriverIsOpen(false);
    }

    const deleteSelected = () => {
        if (!setSelectedTaxiDriver)
            return;

        fetch("/api/TaxiDriver/" + selectedTaxiDriver.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                setRefreshListFlag(true);
            })
            .catch((error) => {
                setRefreshListFlag(true);
            });
    }

    return (
        <div>
            <Button
                color="success"
                onClick={() => { setNewDriverIsOpen(true) }}
            >New Driver</Button>
            <Button
                color="primary"
                disabled={selectedTaxiDriver === undefined}
                onClick={() => { setEditDriverIsOpen(true) }}
            >Edit Driver</Button>
            <Button
                disabled={selectedTaxiDriver === undefined}
                onClick={deleteSelected}
            >Delete Driver</Button>
            <TaxiDriverAdd inDriverAddModalOpen={newDriverIsOpen} addedCallback={newDriverAddedCallback} closedCallback={newDriverClosedCallback} />
            <TaxiDriverList inRefreshFlag={refreshListFlag} selectedCallback={selectedTaxiDriverCallback} />
            <TaxiDriverEdit inDriverId={selectedTaxiDriver ? selectedTaxiDriver.id : ""}
                inDriverName={selectedTaxiDriver ? selectedTaxiDriver.name : ""}
                inDriverSurname={selectedTaxiDriver ? selectedTaxiDriver.surname : ""}
                inDriverEmail={selectedTaxiDriver ? selectedTaxiDriver.email : ""}
                inDriverBaseFarePrice={selectedTaxiDriver ? selectedTaxiDriver.baseFarePrice : ""}
                inDriverBaseFareDistance={selectedTaxiDriver ? selectedTaxiDriver.baseFareDistance : ""}
                inDriverEditModalOpen={editDriverIsOpen} editedCallback={driverEditedCallback} closedCallback={editDriverClosedCallback} />
        </div>
    )
    // <TaxiDriverEdit inDriverEditModalOpen = { editDriverIsOpen } editedCallback = { driverEditedCallback } closedCallback = { editDriverClosedCallback } />

}

export default TaxiDriver;