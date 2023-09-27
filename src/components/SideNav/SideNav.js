import "./SideNav.css";
import React from 'react';
import { Accordion, Offcanvas } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SideNav(props) {
    return (
        <div id="mySidenav" class="sidenav">
            <div class="closebtn" >&times;</div>

            <Accordion flush style={{ backgroundColor: "black" }}>
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
                    <Accordion.Header>Chọn kiểu dữ liệu</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
function offCanvas(props) {
    return (
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export {SideNav, offCanvas};
