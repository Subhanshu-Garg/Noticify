import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getNotice } from '../../actions/notice';

function Notice() {
    const { noticeID, organizationID } = useParams();
    const dispatch = useDispatch();
    const { loading, notice } = useSelector((state) => state.notices);

    useEffect(() => {
        dispatch(getNotice(noticeID, organizationID));
    }, [dispatch, noticeID, organizationID]);

    return (
        <MDBContainer className="my-4">
            
            {loading ? (
                <p>Loading notice...</p>
            ) : (
                <div>
                    {notice ? (
                        <>
                            <MDBTypography variant="h4" className="text-center">
                            {notice.title}
                            </MDBTypography>
                            <hr className="hr" />
                            <MDBTypography style={{ whiteSpace: 'pre-line' }}>
                                {notice.notice}
                            </MDBTypography>
                            <MDBTypography>
                                {notice.createdAt}
                            </MDBTypography>
                            <MDBTypography>
                                {notice.createdBy.fname}
                            </MDBTypography>
                        </>
                    ) : (
                        <p>Notice not found.</p>
                    )}
                </div>
            )}
        </MDBContainer>
    );
}

export default Notice;
