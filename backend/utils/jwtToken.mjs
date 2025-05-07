import configs from "../config/config.mjs";

//Create token and saving it in cookie.
const sendToken = (user, statusCode, message, res) => {
    const token = user.getJWT();


    const options = {
        expires: new Date(Date.now() + configs.COOKIE_EXPIRE * 24 * 3600000),
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    };

    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        message,
        user, 
        token
    });
}

export default sendToken;