import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardLink, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit";
import React from "react";

function NoticeCard({ title, content, date, imageURL, documentURL }) {
    return (
        <MDBCard className="h-100">
            <MDBCardBody>
                {imageURL && <MDBCardImage src={imageURL} position="top" alt="..." />}
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>{content}</MDBCardText>
                {documentURL && <MDBCardLink href={documentURL}>View document</MDBCardLink>}
            </MDBCardBody>
            <MDBCardFooter className="text-muted">
                {date}
            </MDBCardFooter>
        </MDBCard>
    );

}

export default NoticeCard;