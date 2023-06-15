import axios from "axios";

export const loginUser = (email, password)=> async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        })

        const data = await axios.post("/api/v1/login",{ email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch({
            type: "LoginSuccess",
            payload: data.data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

export const registerUser = (fname, lname, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest",
        })

        const { data } = await axios.post("/api/v1/register", {fname, lname, email, password}, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutRequest",
        });

        const data = await axios.get("/api/v1/logout");

        dispatch({
            type: "LogoutSuccess",
            payload: data.data.message,
        });
    } catch (error) {
        dispatch({
            type: "LogoutFailure",
            payload: error.response.data.message
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        
        const data = await axios.get("/api/v1/users/me");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.data.user
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}
