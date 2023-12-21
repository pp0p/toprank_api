import dotenv from "dotenv";
dotenv.config();
export const config = {
  username: String(process.env.USERNAME),
  password: String(process.env.PASSWORD),
  jwtSecert: String(process.env.JWT_SECERT),
  mongoUri: String(process.env.MONGO_URI),
  port: Number(process.env.PORT) || 5000,
  corsOption: {
    origin: ["*"],
    credentials: true,
  },
};
