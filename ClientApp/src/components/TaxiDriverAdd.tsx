import { features } from "process";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

export interface TaxiDriverAddProps {
    inDriverAddModalOpen: boolean;
    addedCallback: () => void;
    closedCallback: () => void;
}

const TaxiDriverAdd = ({ inDriverAddModalOpen, addedCallback, closedCallback }: TaxiDriverAddProps) => {
    useEffect(() => {
        if (!inDriverAddModalOpen) {
            setDriverName("");
            setDriverSurname("");
            setDriverEmail("");
            setDriverBaseFarePrice("");
            setDriverBaseFareDistance("");
        }
    }, [inDriverAddModalOpen])

    const [driverName, setDriverName] = useState<string>();
    const [driverSurname, setDriverSurname] = useState<string>();
    const [driverEmail, setDriverEmail] = useState<string>();
    const [driverBaseFarePrice, setDriverBaseFarePrice] = useState<string>();
    const [driverBaseFareDistance, setDriverBaseFareDistance] = useState<string>();

    const [validateFlag, setValidateFlag] = useState(false);
    const [validateMessage, setValidateMessage] = useState("");

    const checkFarePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        var regexp = new RegExp(/^[0-9]*\.?[0-9]*$/);
        if (regexp.test(e.currentTarget.value)) {
            setDriverBaseFarePrice(e.currentTarget.value);
        } else {
            setDriverBaseFarePrice(driverBaseFarePrice);
        }
    }

    const checkFareDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
        var regexp = new RegExp(/^[0-9]*\.?[0-9]*$/);
        if (regexp.test(e.currentTarget.value)) {
            setDriverBaseFareDistance(e.currentTarget.value);
        } else {
            setDriverBaseFareDistance(driverBaseFareDistance);
        }
    }

    useEffect(() => {
        setValidateFlag(true);
        if (!driverEmail || !driverSurname || !driverEmail || !driverBaseFarePrice || !driverBaseFareDistance) {
            setValidateFlag(false);
            setValidateMessage("Please input all value");
            return;
        }
        /*
        if (driverEmail === "" || driverSurname === "" || driverEmail === "" || driverBaseFarePrice === "" || driverBaseFareDistance === "" ) {
            setValidateFlag(false);
            setValidateMessage("Please input all value");
            return;
        }
        */
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(driverEmail).toLowerCase())) {
            setValidateFlag(false);
            setValidateMessage("Incorrect email format");
            return;
        }
        setValidateMessage("Validated");
    }, [driverName, driverSurname, driverEmail, driverBaseFarePrice, driverBaseFareDistance]);

    const AddTaxiDriver = () => {
        if (!validateFlag)
            return;

        const upJson: any = {
            Name: driverName,
            Surname: driverSurname,
            Email: driverEmail,
            BaseFarePrice: driverBaseFarePrice,
            BaseFareDistance: driverBaseFareDistance,
        }

        const sampleJson: any = {
            Name: "Martin",
            Surname: "Japan",
            Email: "abc@def.com",
            BaseFarePrice: 10,
            BaseFareDistance: 10,
        }

        fetch("/api/TaxiDriver/", {
            method: "POST",
            body: JSON.stringify(upJson),
            // body: JSON.stringify(sampleJson),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (response.ok)
                    addedCallback();
            })
            .catch((error) => {

            });
    }

    return (
        <Modal isOpen={inDriverAddModalOpen}>
            <ModalHeader>
                New Driver
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col>Name</Col>
                    <Col><Input type="text" placeholder="Name" onChange={(e) => { setDriverName(e.currentTarget.value) }} /></Col>
                    <Col><Input type="text" placeholder="Surname" onChange={(e) => { setDriverSurname(e.currentTarget.value) }} /></Col>
                </Row>
                <Row>
                    <Col>Email</Col>
                    <Col><Input type="email" placeholder="Email" onChange={(e) => { setDriverEmail(e.currentTarget.value) }} /></Col>
                </Row>
                <Row>
                    <Col>Base Fare Price</Col>
                    <Col><Input type="text" placeholder="Base Fare Price" value={driverBaseFarePrice} onChange={(e) => { checkFarePrice(e) }} /></Col>
                </Row>
                <Row>
                    <Col>Base Fare Distance</Col>
                    <Col><Input type="text" placeholder="Base Fare Distance" value={driverBaseFareDistance} onChange={(e) => { checkFareDistance(e) }} /></Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <small>{validateMessage}</small>
                <Button
                    color="primary"
                    onClick={AddTaxiDriver}
                    disabled={!validateFlag}
                >Submit</Button>
                <Button
                    onClick={closedCallback}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default TaxiDriverAdd;