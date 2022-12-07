import mongoose from "mongoose";
import { app } from "./app";
const port: string | undefined = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connect database successfully!");
    app.listen(port, () => {
      console.log(`Server running at port ${port} ✅✅`);
    });
  } catch (error) {
    //console.log(error);
    console.log("Connect database fail!");
  }
};

startServer();
