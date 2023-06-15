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