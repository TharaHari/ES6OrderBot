const express = require('express');
const bodyParser = require("body-parser");
const SandwichOrder = require("./orderChatBot");

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oOrders = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    if(!oOrders.hasOwnProperty(sFrom)){
        oOrders[sFrom] = new SandwichOrder();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply;
    if(req.body.item == 'SANDWICH') {
        aReply = oOrders[sFrom].handleSandwich(sMessage);
    } else if(req.body.item == 'BURGER') {
        aReply = oOrders[sFrom].handleBurger(sMessage);
    } else if(req.body.item == 'PIZZA') {
        aReply = oOrders[sFrom].handlePizza(sMessage); 
    }
    
    if(oOrders[sFrom].isDone()){
        delete oOrders[sFrom];
    }
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 8080;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
