import { config } from "./config";
import mongoose from "mongoose";
const db = () => {
  mongoose
    .connect(config.mongoUri)
    .then(() => {
      console.log("[🗄️] Database Connected [🗄️]");
    })
    .catch((error) => {
      console.error("[❌] Database Connection Error: \n", error);
    });
};
export default db