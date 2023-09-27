
import "./Modal.css";
import React from 'react';
import { Modal } from 'react-bootstrap';
import Chart from './../Chart';
import 'react-datepicker/dist/react-datepicker.css';


function CustomModal(props) {
    if (!props.show || !props.dataModal) return;

    let modalTitle = (props.dataModal.address)
    let modalBody = (props.dataModal.commune)
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



export default CustomModal;