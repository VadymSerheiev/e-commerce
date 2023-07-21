require('dotenv').config();
const path = require('path');
const express = require('express');
require("./db/mongoose");
const userRouter = require('./db/routers/user')
const productRouter = require('./db/routers/product')
const groupRouter = require('./db/routers/group')
const blogRouter = require('./db/routers/blog') 
const replicatorRouter = require('./db/routers/replicator')
const orderRouter = require('./db/routers/order') 
require('./db/functions/user');
require('./db/functions/code');
require('./db/functions/group');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || process.env.STATIC_PORT;

app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(auth)
app.use(userRouter)
app.use(productRouter)
app.use(groupRouter)
app.use(blogRouter)
app.use(replicatorRouter)
app.use(orderRouter)
app.use(cors())

if (process.env.MODE === 'production') {
  const dir = __dirname.replace('\server', '\client')
  app.use(express.static(path.join(dir, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(dir, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});