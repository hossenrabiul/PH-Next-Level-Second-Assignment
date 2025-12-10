import { app } from "./app";
import config from "./config";
const port = config.port



app.listen(port, () => {
  console.log("Server is listening on port 5000");
});