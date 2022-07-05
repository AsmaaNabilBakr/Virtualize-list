import React from 'react';
import {
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
} from 'mdbreact';
import "../App.scss"

const AddTicketModal = (props) => {
    console.log('modal')
    return (
        <>
            {props.mode === "new" ? <>
                <MDBModal className="addModal" isOpen={props.isAddModalVisible} toggle={props._closeModal} >
                    <MDBModalHeader toggle={props.toggle}>Add New Ticket</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput label="Ticket Subject" value={props.newTicket?.subject} name="subject" onChange={(e) => props.handleChange(e)} />
                        <MDBInput type="textarea" label="Ticket Description" rows="5" value={props.newTicket?.description} name="description" onChange={(e) => props.handleChange(e)} />
                        <div className="dropdown">
                            <label>Priorty</label>
                            <select className="browser-default custom-select" value={props.newTicket?.priority} name="priority" onChange={(e) => props.handleChange(e)}>
                                <option>Choose your option</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label>Status</label>
                            <select className="browser-default custom-select" value={props.newTicket?.status} name="status" onChange={(e) => props.handleChange(e)}>
                                <option>Choose your option</option>
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Solved">Solved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        {props.isFormHasError &&
                            <div className='error'>
                                Kindly fill all inputs
                            </div>
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <button className="btn cancelBtn" onClick={props._closeModal}>Cancel</button>
                        <button className="btn saveBtn" onClick={props.addTicket}>Create</button>
                    </MDBModalFooter>
                </MDBModal>
            </> : props.mode === "edit" &&
            <>
                <MDBModal className="addModal" isOpen={props.isAddModalVisible} toggle={props._closeModal} >
                    <MDBModalHeader toggle={props.toggle}>Edit Ticket</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput label="Ticket Subject" valueDefault={props.curTicket?.subject} name="subject" onChange={(e) => props.handleChange(e)} />
                        <MDBInput type="textarea" label="Ticket Description" rows="5" valueDefault={props.curTicket?.description} name="description" onChange={(e) => props.handleChange(e)} />
                        <div className="dropdown">
                            <label>Priorty</label>
                            <select className="browser-default custom-select" defaultValue={props.curTicket?.priority} name="priority" onChange={(e) => props.handleChange(e)}>
                                <option>Choose your option</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label>Status</label>
                            <select className="browser-default custom-select" defaultValue={props.curTicket?.status}  name="status" onChange={(e) => props.handleChange(e)}>
                                <option>Choose your option</option>
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Solved">Solved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        {props.isFormHasError &&
                            <div className='error'>
                                Kindly fill all inputs
                            </div>
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <button className="btn cancelBtn" onClick={props._closeModal}>Cancel</button>
                        <button className="btn saveBtn" onClick={props.editTicket}>Save</button>
                    </MDBModalFooter>
                </MDBModal>
            </>
            }


        </>
    )

}
export default AddTicketModal;



