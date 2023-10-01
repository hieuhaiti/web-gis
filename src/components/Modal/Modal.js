
import "./Modal.css";
import React from 'react';
import { Modal } from 'react-bootstrap';
import Chart from './../Chart';
import { GetColorOfMarker, GetMainPollution } from "../../utils/help";
import 'react-datepicker/dist/react-datepicker.css';


function CustomModal(props) {
    if (!props.show || !props.dataModal) return;

    let modalTitle = (props.dataModal.address)
    let modalBody = {
        commune: props.dataModal.commune,
        date: JSON.parse(props.dataModal.date),
        no2: JSON.parse(props.dataModal.no2),
        so2: JSON.parse(props.dataModal.so2),
        tsp: JSON.parse(props.dataModal.tsp),
    }

    // Lấy giá trị value từ hàm getValuePollution
    const getValuePollution = GetMainPollution(modalBody)[1]
    const mainPollutant = GetMainPollution(modalBody)[0]

    // Lấy màu sau khi đã xác định được giá trị của địa điểm đó
    const colorModal = GetColorOfMarker(getValuePollution)

    const headerStyle = {
        backgroundColor: colorModal[1], // Use the color determined by your logic
        color: colorModal[2], // Text color
    };

    const icoinImage = {
        faceColor: colorModal[4],
        recommentColor: [colorModal[5], colorModal[6], colorModal[7], colorModal[8]]
    }
    const bodyStyle = {
        backgroundColor: '#f7f7f7', // Background color for the modal body
    }
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton style={headerStyle} >
                <img src={icoinImage.faceColor} alt="Icon" width="10%" height="50%" />
                <Modal.Title><h2> {modalTitle} </h2></Modal.Title>
            </Modal.Header>
            <Modal.Body style={bodyStyle}>
                <table>
                    <tr>
                        <td><div class="modal-detail">
                            <table>
                                <tr>
                                    <td colSpan={2}>
                                        <b>Thời gian lấy mẫu: {modalBody.date.day}-{modalBody.date.month}-{modalBody.date.year}</b>
                                    </td>
                                </tr>
                                {Object.keys(modalBody).map((key) => {
                                    if (key !== "date" && key !== "commune") {
                                        if (mainPollutant === key) {
                                            return (
                                                <tr key={key}>
                                                    <td class="column1"><b>{key.toUpperCase()}: {modalBody[key].value}</b></td>
                                                    <td class="column2">
                                                        <div
                                                            class={"progress custom-progress-" + modalBody[key].result}>
                                                            <div class={"progress-bar custom-progress-bar-" + modalBody[key].result}
                                                                role="progressbar"
                                                                style={{ width: `${(modalBody[key].result / 6) * 100}%` }}>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return (
                                            <tr key={key}>
                                                <td class="column1">{key.toUpperCase()}: {modalBody[key].value}</td>
                                                <td class="column2">
                                                    <div
                                                        class={"progress custom-progress-" + modalBody[key].result}>
                                                        <div class={"progress-bar custom-progress-bar-" + modalBody[key].result}
                                                            role="progressbar"
                                                            style={{ width: `${(modalBody[key].result / 6) * 100}%` }}>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null; // Bỏ qua khóa "date" và khóa "commune"
                                })}
                            </table>
                        </div></td>
                        <td rowSpan={2}><div class="pie-chart">
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaa

                        </div></td>
                    </tr>
                    <tr>
                        <td><div class="recommendation">
                            <table>
                                <tr>
                                    <th colspan="4">Khuyến cáo sức khoẻ </th>
                                </tr>
                                <tr>
                                    <td class="imageRecomment"><img src={icoinImage.recommentColor[0]} alt="Icon" /> </td>
                                    <td class="recomment">Khuyến cáo sức khoẻ </td>
                                    <td class="imageRecomment"><img src={icoinImage.recommentColor[1]} alt="Icon" /> </td>
                                    <td class="recomment">Khuyến cáo sức khoẻ </td>
                                </tr>
                                <tr>
                                    <td class="imageRecomment"><img src={icoinImage.recommentColor[2]} alt="Icon" /> </td>
                                    <td class="recomment">Khuyến cáo sức khoẻ </td>
                                    <td class="imageRecomment"><img src={icoinImage.recommentColor[3]} alt="Icon" /> </td>
                                    <td class="recomment">Khuyến cáo sức khoẻ </td>
                                </tr>
                            </table>
                        </div></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><div class="bar-chart">
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div></td>
                    </tr>
                </table>

                {/* <Chart
                data={props.dataChart}
                /> */}
                { }

            </Modal.Body>
        </Modal>
    );
}



export default CustomModal;