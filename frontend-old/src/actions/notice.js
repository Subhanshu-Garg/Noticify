import axios from "axios";

export const createNotice = (notice, organizationID) => async (dispatch) => {
    try {
        dispatch({
            type: "CreateNoticeRequest"
        });
    
        const data = await axios.post(`/api/v1/organizations/${organizationID}/notices`, {
            title: notice.title,
            notice: notice.notice,
        },{
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        dispatch({
            type: "CreateNoticeSuccess",
            payload: data.data.notice
        });
    } catch (error) {
        dispatch({
            type: "CreateNoticeFailure",
            payload: error.response.data.message
        })
    }
    
}

export const getNotices = (organizationID) => async (dispatch) => {
    try {
        dispatch({
            type: "GetNoticesRequest"
        })

        const data = await axios.get(`/api/v1/organizations/${organizationID}/notices`);

        dispatch({
            type: "GetNoticesSuccess",
            payload: data.data.notices
        })
    } catch (error) {
        dispatch({
            type: "GetNoticesFailure",
            payload: error.response.data.message
        })
    }
}

export const getNotice = (noticeID, organizationID) => async (dispatch) => {
    try {
        dispatch({
            type: "GetNoticeRequest"
        })

        const data = await axios.get(`/api/v1/organizations/${organizationID}/notices/${noticeID}`)

        dispatch({
            type: "GetNoticeSuccess",
            payload: data.data.notice
        })
    } catch (error) {
        dispatch({
            type: "GetNoticeFailure",
            payload: error.response.data.message
        })
    }
}

export const deleteNotice = (noticeID, organizationID) => async (dispatch) => {
    try {
        dispatch({
            type: "DeleteNoticeRequest"
        })

        const {data} = await axios.delete(`/api/v1/organizations/${organizationID}/notices/${noticeID}`)

        dispatch({
            type: "DeleteNoticeSuccess",
            payload: data.deletedNotice
        })
    } catch (error) {
        dispatch({
            type: "DeleteNoticeFailure",
            payload: error.response.data.message
        })
    }
}