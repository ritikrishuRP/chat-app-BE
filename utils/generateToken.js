import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn : '15d'
    })
    // const token = "3LbdIqJ9wHEuu5WfrGWXxIaw/U1F/cIGu3b5xUP0YdI=";

     res.cookie("jwt",token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })

    // console.log(res);
}

export default generateTokenAndSetCookie;