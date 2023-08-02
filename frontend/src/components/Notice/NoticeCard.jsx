import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardLink, MDBCardText, MDBCardTitle, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { deleteNotice } from "../../actions/notice";
import { useState } from "react";

function NoticeCard({ noticeID, organizationID, title, content, date, imageURL, documentURL, isAdmin, onEdit }) {
    const dispatch = useDispatch();
    const handleDeleteNotice = () => {
        dispatch(deleteNotice(noticeID, organizationID))
    }
    const { edit, setIsEdit } = useState(false);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };

    const handleEdit = (val) => {
        setIsEdit(val);
    }

    const formattedDate = new Date(date).toLocaleString(undefined, options);
    return (
        <MDBCard className="h-100">
            <MDBCardBody className="position-relative">
                {imageURL && <MDBCardImage src={imageURL} position="top" alt="..." />}

                <MDBCardTitle>{title}</MDBCardTitle>
                {
                    isAdmin &&
                    <MDBDropdown className="position-absolute top-0 end-0 mt-4 me-3" group>
                        <MDBDropdownToggle role="button" tag='a'>
                            <MDBIcon fas icon="ellipsis-v" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <Link to={`/organizations/${organizationID}/notices/${noticeID}`}>
                                <MDBDropdownItem link>
                                    <MDBIcon className="me-2" fas icon="external-link-alt" />
                                    Open Seperately
                                </MDBDropdownItem>
                            </Link>
                            <MDBDropdownItem link onClick={() => handleEdit(true)}>
                                <MDBIcon className="me-2" fas icon="edit" />
                                Edit Notice
                            </MDBDropdownItem>
                            <MDBDropdownItem link onClick={()=>handleDeleteNotice()}>
                                <MDBIcon className="me-2" fas icon="trash" />
                                Delete Notice
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                }


                {
                    content.length > 150 ?
                        <MDBCardText contentEditable={edit} style={{ whiteSpace: 'pre-line' }}>{content.slice(0, 200)} <Link to={`/organizations/${organizationID}/notices/${noticeID}`}>...more</Link></MDBCardText> :
                        <MDBCardText contentEditable={edit} style={{ whiteSpace: 'pre-line' }}>{content}</MDBCardText>
                }
                {documentURL && <MDBCardLink href={documentURL}>View document</MDBCardLink>}
            </MDBCardBody>
            <MDBCardFooter className="text-muted">
                {formattedDate}
            </MDBCardFooter>
        </MDBCard>
    );

}

export default NoticeCard;