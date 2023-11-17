const express = require('express')
const paymentRoutes=require('./router/paymentRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(paymentRoutes);

app.get('/', function (req, res) {
  res.send('Hello World');
});
var port = 4000 || process.env.PORT;
app.listen(port);
console.log('listening on port : '+port);