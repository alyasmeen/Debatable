const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json())
app.use("/debates", require('./routers/debatesRoutes'));
app.use("/debates/debate", require('./routers/endorsementsRoutes'));
app.use("/users/", require('./routers/usersRoutes'));


app.listen(3000, ()=>{
    console.log("port 3000");
});

module.exports={
    app
}