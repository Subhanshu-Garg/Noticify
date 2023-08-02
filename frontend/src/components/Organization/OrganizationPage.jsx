import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

const OrganizationPage = () => {
    return (
        <MDBContainer>
            <MDBRow className="my-4">
                <MDBCol>
                    <h1 className="mb-4">Welcome to Organization Name</h1>
                    <p>Organization Description</p>
                </MDBCol>
            </MDBRow>
            
            {/* Additional Functionality for Admins */}
            <MDBRow className="my-4">
                <MDBCol>
                    <div className="d-flex justify-content-start">
                        <MDBBtn color="primary" className="me-3">
                            <MDBIcon icon="plus" className="me-2" />
                            Add Notice
                        </MDBBtn>
                        <MDBBtn color="primary" className="me-3">
                            <MDBIcon icon="users" className="me-2" />
                            Manage Members
                        </MDBBtn>
                        <MDBBtn color="primary">
                            <MDBIcon icon="cog" className="me-2" />
                            Settings
                        </MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
            
            {/* Organization Notices */}
            <MDBRow className="my-4">
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Notice Title</MDBCardTitle>
                            <MDBCardText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed hendrerit libero in dui malesuada tristique.
                            </MDBCardText>
                            <MDBBtn color="primary">Read More</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OrganizationPage;
