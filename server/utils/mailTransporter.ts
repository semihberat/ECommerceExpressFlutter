import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "kaia.gorczany67@ethereal.email",
    pass: "t7Uv8zbt9YvU1nGBZH",
  },
});
