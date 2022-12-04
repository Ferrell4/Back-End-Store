// establishing connection on port 3001
const PORT = process.env.PORT || 3001;
const express = require('express');
const routes = require('./routes');
const sequelize = require("./config/connection")
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log (`Now Listening at ${PORT} `))
});