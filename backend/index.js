const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
connectToMongo();
const port = 5000 || process.env.PORT;
var cors = require("cors");

app.use(cors());
app.use(express.json()); //to convert request data to json

// Credential Apis
app.use("/api/employee/auth", require("./routes/Employee Api/employeeCredential"));
app.use("/api/manager/auth", require("./routes/Manager Api/managerCredential"));
app.use("/api/admin/auth", require("./routes/Admin Api/adminCredential"));
// Details Apis
app.use("/api/employee/details", require("./routes/Employee Api/employeeDetails"));
app.use("/api/manager/details", require("./routes/Manager Api/managerDetails"));
app.use("/api/admin/details", require("./routes/Admin Api/adminDetails"));
// Other Apis
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/material", require("./routes/material"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/sector", require("./routes/sector"));
app.use("/api/evaluations", require("./routes/evaluations"));
app.use("/api/branch", require("./routes/branch"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
