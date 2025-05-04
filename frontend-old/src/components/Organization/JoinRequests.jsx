import React from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBtnGroup, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { acceptJoinOrganizationRequest } from '../../actions/organization';

function JoinRequests({ requests, organizationID }) {
    const dispatch = useDispatch();
    const handleAcceptRequest = (userID) => {
        dispatch(acceptJoinOrganizationRequest(organizationID, userID))
    }
    const handleRejectRequest = () => {

    }
    return (
        <MDBListGroup flush>
            {requests &&
                requests.length === 0 ?  "No pending requests." :
                requests.map((requestUser) => (
                    <MDBListGroupItem key={requestUser._id} tag="button" className="border-0">
                        <MDBRow className="align-items-center">
                            <MDBCol size="4">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                                    className="rounded-circle me-2"
                                    height="40"
                                    loading="lazy"
                                    alt="Avatar"
                                />
                            </MDBCol>
                            <MDBCol size="8">
                                <div className="d-flex-row align-items-center justify-content-between">
                                    <div>{`${requestUser.fname} ${requestUser.lname}`}</div>
                                    <MDBBtnGroup size='sm' style={{ height: "1.5rem" }}>
                                        <MDBBtn outline rounded color="success" onClick={() => handleAcceptRequest(requestUser._id)}>
                                            <MDBIcon fas icon="check" color="success" /> Accept
                                        </MDBBtn>
                                        <MDBBtn outline rounded color="danger" onClick={() => handleRejectRequest(requestUser._id)}>
                                            <MDBIcon fas icon="times" color="danger" /> Reject
                                        </MDBBtn>
                                    </MDBBtnGroup>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBListGroupItem>
                ))}
        </MDBListGroup>
    );
}

export default JoinRequests;
