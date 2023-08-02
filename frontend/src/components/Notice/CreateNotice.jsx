import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBTypography, MDBTextArea } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../../actions/notice";

const CreateNotice = ({ organizationId, organizationName }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { loading: createLoading } = useSelector((state) => state.notices);

  const handleCreateNotice = (e) => {
    e.preventDefault();
    dispatch(
      createNotice(
        {
          title: title,
          notice: content
        },
        organizationId
      )
    );
    setTitle("");
    setContent("");
  };

  return (
    <MDBContainer className="my-2">
      <MDBTypography variant="h4">{`${organizationName}`}</MDBTypography>
      <hr className="hr" />
      <MDBRow>
        <MDBCol>
            <form onSubmit={handleCreateNotice}>
              <MDBInput
                className="mb-2"
                label="Notice Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <MDBTextArea
                className="mb-2"
                type="textarea"
                label="Notice Content"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              {/* Uncomment the following code if uploading of documents or images is needed */}
              {/* <MDBFile className="mb-2" /> */}
              <MDBBtn color="primary" type="submit" disabled={createLoading}>
                {createLoading ? "Creating..." : "Create Notice"}
              </MDBBtn>
            </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreateNotice;
