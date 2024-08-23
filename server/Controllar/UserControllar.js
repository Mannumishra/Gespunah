const user = require("../Model/UserModel")
const Otp = require("../Model/OtpModel")
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const transporter = require("../Utils/mailTransporter")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dglihfwse',
    api_key: '939345957566958',
    api_secret: 'q-Pg0dyWquxjatuRb62-PtFzkM0'
});
const uploadCloundanary = async (file) => {
    try {
        const uploadFile = await cloudinary.uploader.upload(file)
        return uploadFile.secure_url
    } catch (error) {
        console.log(error)
    }
}
const schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)
    .is().max(15)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);


    const sendOtp = async (req, res) => {
        const { email } = req.body;
        try {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await Otp.create({ email, otp });
            const htmlTemplate = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <div style="text-align: center;">
                        <img src="https://gespunah.com/static/media/logo.f58a69af8ad26e8658ed.jpeg" alt="Gespunah" style="width: 150px; margin-bottom: 20px;" />
                    </div>
                    <h2 style="color: #333;">Hello</h2>
                    <p style="color: #555;">Thank you for signing up with <strong>Gespunah</strong>.</p>
                    <p style="color: #555;">Please use the following OTP to complete your registration:</p>
                    <h1 style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center; color: #333;">${otp}</h1>
                    <p style="color: #555;">This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
                    <p style="color: #555;">If you did not request this OTP, please ignore this email.</p>
                    <p style="color: #333;">Best regards,<br/>The Gespunah Team</p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="text-align: center; color: #777; font-size: 12px;">&copy; ${new Date().getFullYear()} Gespunah. All rights reserved.</p>
                </div>
            `;
    
            await transporter.sendMail({
                from: process.env.EMAIL_SEND,
                to: email,
                subject: 'Your OTP Code from Gespunah',
                html: htmlTemplate
            });
    
            res.status(200).json({ message: 'OTP sent to your email' });
        } catch (err) {
            console.error(err);
            if (err.response && err.response.includes('address not found')) {
                return res.status(400).json({ message: 'Email address not found' });
            }
            res.status(500).json({ message: 'Error sending OTP' });
        }
    };
    
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        await Otp.deleteMany({ email });
        res.status(200).json({ message: 'OTP verified' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
};

const createRecord = async (req, res) => {
    try {
        let { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All Required Fields"
            });
        }
        if (schema.validate(password)) {
            const existingUser = await user.findOne({ $or: [{ email }, { phone }] });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: existingUser.email === email 
                        ? "This email is already registered with us" 
                        : "This phone is already registered with us"
                });
            }
            let newUser = new user({ name, email, phone, password });
            bcrypt.hash(newUser.password, 12, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                } else {
                    newUser.password = hash;
                    await newUser.save();
                    const mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: newUser.email,
                        subject: "Account Created Successfully: Team Gespunah",
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                                <div style="text-align: center;">
                                    <img src="https://gespunah.com/static/media/logo.f58a69af8ad26e8658ed.jpeg" alt="Gespunah" style="width: 150px; margin-bottom: 20px;" />
                                </div>
                                <h2 style="color: #333;">Hello ${newUser.name}</h2>
                                <p style="color: #555;">Your account has been successfully created with <strong>Gespunah</strong>.</p>
                                <p style="color: #555;">You can now enjoy our latest products and great deals.</p>
                                <p style="color: #333;">Thank you for choosing Gespunah!</p>
                                <p style="color: #555;">If you have any questions, feel free to contact us.</p>
                                <p style="color: #333;">Best regards,<br/>The Gespunah Team</p>
                                <hr style="border: none; border-top: 1px solid #ddd;" />
                                <p style="text-align: center; color: #777; font-size: 12px;">&copy; ${new Date().getFullYear()} Gespunah. All rights reserved.</p>
                            </div>
                        `
                    };                    
                    transporter.sendMail(mailOptions, (error) => {
                        if (error) {
                            console.log(error);
                            return res.status(401).json({
                                success: false,
                                message: "Invalid Email Address"
                            });
                        }
                    });
                    res.status(200).json({
                        success: true,
                        message: "New User Account Created Successfully",
                        data: newUser
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Password must be between 8-15 characters, contain 1 uppercase, 1 lowercase, 1 digit, 1 symbol, and no spaces"
            });
        }
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            res.status(400).json({
                success: false,
                message: `This ${field} is already registered with us`
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await user.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "UserRecord Found",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}
const getSingleRecord = async (req, res) => {
    try {
        let data = await user.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "UserRecord Found",
                data: data
            })
        }
        else {
            res.status(400).json({
                success: false,
                mess: "UserRecord Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}
const updateRecord = async (req, res) => {
    try {
        let data = await user.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                const url = await uploadCloundanary(req.file.path)
                data.pic = url
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Profile Updated Successfully",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}
const login = async (req, res) => {
    try {
        console.log(req.body)
        let data = await user.findOne({
            email: req.body.email
            // $or: [
            //     { username: req.body.username },
            //     { email: req.body.email }
            // ]
        })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                let key = data.role == "Admin" ? process.env.JWT_SALT_KEY_ADMIN : process.env.JWT_SALT_KEY_BUYER
                jwt.sign({ data }, key, { expiresIn: 1296000 }, (error, token) => {
                    if (error)
                        res.status(500).json({ success: false, message: "Internal Server Error" })
                    else
                        res.status(200).json({ success: true, data: data, token: token })
                })
            } else {
                return res.status(401).json({ success: false, message: "Invaild username or password" })
            }
        }
        else {
            return res.status(401).json({ success: false, message: "Invaild username or password" })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}
const forgetPassword1 = async (req, res) => {
    console.log("i am hit")
    console.log(req.body);
    try {
        var data = await user.findOne({ email: req.body.email })
        if (data) {
            let otp = parseInt(Math.random() * 1000000)
            data.otp = otp
            await data.save()
            const mailOptions = {
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "OTP for Password Reset: Team Gespunah",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff;">
                        <div style="text-align: center;">
                            <img src="https://gespunah.com/static/media/logo.f58a69af8ad26e8658ed.jpeg" alt="Gespunah" style="width: 150px; margin-bottom: 20px;" />
                        </div>
                        <h2 style="color: #333; text-align: center;">Hello ${data.name},</h2>
                        <p style="color: #555;">Your OTP for Password Reset is:</p>
                        <p style="font-size: 24px; font-weight: bold; color: #333; text-align: center; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">
                            ${data.otp}
                        </p>
                        <p style="color: #555;">Please do not share your OTP with anyone.</p>
                        <p style="color: #333;">Thank you for being a part of Gespunah!</p>
                        <p style="color: #555;">If you have any questions or need assistance, feel free to contact us.</p>
                        <p style="color: #333;">Best regards,<br/>The Gespunah Team</p>
                        <hr style="border: none; border-top: 1px solid #ddd;" />
                        <p style="text-align: center; color: #777; font-size: 12px;">&copy; ${new Date().getFullYear()} Gespunah. All rights reserved.</p>
                    </div>
                `
            };            
            transporter.sendMail(mailOptions, ((error) => {
                if (error) {
                    return res.status(400).json({ success: false, message: "Invalid Email Address" })
                }
            }))
            res.status(200).json({ success: true, message: "OTP Sent on Your Registered Email Address" })
        }
        else
            return res.status(401).json({ success: false, message:"Email not registered"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
const forgetPassword2 = async (req, res) => {
    try {
        var data = await user.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
            ]
        })
        if (data) {
            if (data.otp == req.body.otp)
                res.status(200).json({ success: true, message: "Done" })
            else
                return res.status(401).json({ success: false, message: "Invalid OTP" })
        }
        else
            res.status(401).json({ success: false, message: "Anauthorized Activity" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
const forgetPassword3 = async (req, res) => {
    try {
        var data = await user.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
            ]
        })
        if (data) {
            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error)
                    return res.status(500).json({ success: false, message: "Internal Server Error" })
                else {
                    data.password = hash
                    await data.save()
                    res.status(200).json({ success: true, message: "Password Has Been Reset" })
                }
            })
        }
        else
            res.status(401).json({ success: false, message: "Anauthorized Activity" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = {
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    login: login,
    forgetPassword1: forgetPassword1,
    forgetPassword2: forgetPassword2,
    forgetPassword3: forgetPassword3,
    updateRecord: updateRecord,
    getRecord: getRecord,
    sendOtp:sendOtp,
    verifyOtp:verifyOtp
}