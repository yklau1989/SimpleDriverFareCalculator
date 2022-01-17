import { features } from "process";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

export interface TaxiDriverEditProps {
    inDriverId: number;
    inDriverName: string;
    inDriverSurname: string;
    inDriverEmail: string;
    inDriverBaseFarePrice: string;
    inDriverBaseFareDistance: string;

    inDriverEditModalOpen: boolean;
    editedCallback: () => void;
    closedCallback: () => void;
}

const TaxiDriverEdit = ({ inDriverId, inDriverName, inDriverSurname, inDriverEmail, inDriverBaseFarePrice, inDriverBaseFareDistance, inDriverEditModalOpen, editedCallback, closedCallback }) => {
    useEffect(() => {
        console.log(inDriverEditModalOpen);
        console.log(inDriverName);

        if (inDriverEditModalOpen) {
            setDriverName(inDriverName);
            setDriverSurname(inDriverSurname);
            setDriverEmail(inDriverEmail);
            setDriverBaseFarePrice(inDriverBaseFarePrice);
            setDriverBaseFareDistance(inDriverBaseFareDistance);
        }
    }, [inDriverEditModalOpen])

    const [driverName, setDriverName] = useState<string>();
    const [driverSurname, setDriverSurname] = useState<string>();
    const [driverEmail, setDriverEmail] = useState<string>();
    const [driverBaseFarePrice, setDriverBaseFarePrice] = useState<string>();
    const [driverBaseFareDistance, setDriverBaseFareDistance] = useState<string>();

    const [validateFlag, setValidateFlag] = useState(false);
    const [validateMessage, setValidateMessage] = useState("");

    useEffect(() => {
        setValidateFlag(true);
    }, [driverName, driverSurname, driverEmail, driverBaseFarePrice, driverBaseFareDistance]);

    const EditTaxiDriver = () => {
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

        fetch("/api/TaxiDriver/" + inDriverId, {
            method: "PUT",
            body: JSON.stringify(upJson),
            // body: JSON.stringify(sampleJson),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (response.ok)
                    editedCallback();
            })
            .catch((error) => {

            });
    }

    return (
        <Modal isOpen={inDriverEditModalOpen}>
            <ModalHeader>
                New Driver
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col>Name</Col>
                    <Col><Input type="text" placeholder="Name" value={driverName} onChange={(e) => { setDriverName(e.currentTarget.value) }} /></Col>
                    <Col><Input type="text" placeholder="Surname" value={driverSurname} onChange={(e) => { setDriverSurname(e.currentTarget.value) }} /></Col>
                </Row>
                <Row>
                    <Col>Email</Col>
                    <Col><Input type="email" placeholder="Email" value={driverEmail} onChange={(e) => { setDriverEmail(e.currentTarget.value) }} /></Col>
                </Row>
                <Row>
                    <Col>Base Fare Price</Col>
                    <Col><Input type="number" placeholder="Base Fare Price" value={driverBaseFarePrice} onChange={(e) => { setDriverBaseFarePrice(e.currentTarget.value) }} /></Col>
                </Row>
                <Row>
                    <Col>Base Fare Distance</Col>
                    <Col><Input type="number" placeholder="Base Fare Distance" value={driverBaseFareDistance} onChange={(e) => { setDriverBaseFareDistance(e.currentTarget.value) }} /></Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={EditTaxiDriver}
                >Submit</Button>
                <Button
                    onClick={closedCallback}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default TaxiDriverEdit;