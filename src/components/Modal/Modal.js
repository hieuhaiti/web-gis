
import "./Modal.css";
import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import Chart from './../Chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function CustomModal(props) {
    if (!props.show || !props.dataModal) return;

    let modalTitle = (props.dataModal.address)
    let modalBody = (props.dataModal.commune)
    // setModalBody(
    //     <div dangerouslySetInnerHTML={{
    //         __html: (() => {
    //             let result = `<table>
    //         <tbody>
    //         <tr></tr>
    //         `
    //             result += `</table>`

    //             return "result";
    //         })
    //     }}
    //     />);
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalBody}
                {/* <Chart
                data={props.dataChart}
                /> */}
            </Modal.Body>
        </Modal>
    );
}

function SiveNav(props) {
    return (
        <div id="mySidenav" class="sidenav">
            <div class="closebtn" >&times;</div>

            <Accordion flush style={{backgroundColor:"black"}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Chọn tháng</Accordion.Header>
                    <Accordion.Body>
                        <div class="date-control">
                            <DatePicker
                                selected={new Date(props.date)}
                                onChange={(event) => props.SetDate(event)}
                                showMonthYearPicker
                                dateFormat="MM/yyyy"
                                minDate={new Date(2018, 0)}
                                maxDate={new Date(2020, 11)}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export { CustomModal, SiveNav };