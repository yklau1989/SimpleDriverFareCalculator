import React, { ChangeEvent, ChangeEventHandler, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import CalculatedRecordList from "./CalculatedRecordList";

const Calculator = () => {
    const [csvFile, setCsvFile] = useState<any>();
    const onChangeCsv = (event: ChangeEvent) => {
        setCsvFile(event.target.files[0]);
    }
    useEffect(() => {
        console.log(csvFile);
    }, [csvFile])

    const sendCalculateRequest = () => {
        fetch("/api/Calculate/", {
            method: "POST",
            body: csvFile,
        })
            .then((response) => {
                setListRefreshFlag(true);
            })
            .catch((error) => {

            });
    }

    const [listRefreshFlag, setListRefreshFlag] = useState(false);
    useEffect(() => {
        setListRefreshFlag(true);
    }, []);
    useEffect(() => {
        if (listRefreshFlag)
            setListRefreshFlag(false);
    }, [listRefreshFlag]);

    return (
        <div>
            <Form>
                <Input type="file" name="file" id="csvFile" accept=".csv" onChange={e => { onChangeCsv(e) }} />
                <Button color="success" disabled={csvFile === undefined} onClick={sendCalculateRequest}>Submit</Button>
            </Form>
            <CalculatedRecordList inRefreshFlag={listRefreshFlag} />
        </div>
    );
}

export default Calculator;