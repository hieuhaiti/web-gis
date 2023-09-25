import React from 'react';
import { Modal } from 'react-bootstrap';
import Chart from './../Chart';


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

export default CustomModal;