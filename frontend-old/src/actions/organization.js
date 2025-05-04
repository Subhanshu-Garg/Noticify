import axios from "axios";

export const registerOrganization = (organizationName) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterOrganizationRequest"
        });

        const data = await axios.post("/api/v1/organizations", { organizationName }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        dispatch({
            type: "RegisterOrganizationSuccess",
            payload: data.data.organization
        });
    } catch (error) {
        dispatch({
            type: "RegisterOrganizationFailure",
            payload: error.response.data.message
        })
    }
};

export const sendJoinOrganizationRequest = (organizationID) => async (dispatch) => {
    try {
        dispatch({
            type: "sendJoinOrganizationRequestRequest"
        });

        const data = await axios.post(`/api/v1/organizations/${organizationID}/join`);

        dispatch({
            type: "JoinOrganizationSuccessRequest",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "JoinOrganizationFailureRequest",
            payload: error.response.data.message
        })
    }
};

export const acceptJoinOrganizationRequest = (organizationID, userID) => async (dispatch) => {
    try {
        dispatch({
            type: "acceptJoinOrganizationRequest"
        });

        const data = await axios.post(`/api/v1/organizations/${organizationID}/accept/${userID}`);

        dispatch({
            type: "acceptJoinOrganizationSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "acceptJoinOrganizationFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllOrganizations = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetAllOrganizationsRequest"
        });

        const data = await axios.get("/api/v1/organizations");
        dispatch({
            type: "GetAllOrganizationsSuccess",
            payload: data.data.organizations
        })
    } catch (error) {
        dispatch({
            type: "GetAllOrganizationsFailure",
            payload: error.response.data.message
        })
    }
}


export const getOrganizationsOfAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetOrganizationsOfAdminRequest"
        });

        const data = await axios.get("/api/v1/organizations?organizations=admin");

        dispatch({
            type: "GetOrganizationsOfAdminSuccess",
            payload: data.data.organizations
        })
    } catch (error) {
        dispatch({
            type: "GetOrganizationsOfAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const getOrganizationsOfUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetOrganizationsOfUserRequest"
        });

        const data = await axios.get("/api/v1/organizations?organizations=user");

        dispatch({
            type: "GetOrganizationsOfUserSuccess",
            payload: data.data.organizations    
        })
    } catch (error) {
        dispatch({
            type: "GetOrganizationsOfUserFailure",
            payload: error.response.data.message
        })
    }
}
