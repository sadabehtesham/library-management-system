import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    const { SMTP_HOST, SMTP_SERVICE, SMTP_PORT, SMTP_MAIL, SMTP_PASSWORD } = process.env;

    if (!SMTP_HOST || !SMTP_SERVICE || !SMTP_PORT || !SMTP_MAIL || !SMTP_PASSWORD) {
        throw new Error("Email service is not configured. Please set SMTP_HOST, SMTP_SERVICE, SMTP_PORT, SMTP_MAIL, and SMTP_PASSWORD in the server config file.");
    }

    const transporter = nodeMailer.createTransport({
        host: SMTP_HOST,
        service: SMTP_SERVICE,
        port: Number(SMTP_PORT),
        auth: {
            user: SMTP_MAIL,
            pass: SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};