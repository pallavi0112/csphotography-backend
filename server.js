const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectToDB = require("./config/db.config");
const path = require('path');

const app = express();

// Load environment variables based on ENV
if (process.env.ENV === "development") {
  dotenv.config({ path: path.join(__dirname, ".env.local") });
  dotenv.config();
} else {
  dotenv.config();
}

connectToDB();

const port = process.env.PORT || 6060;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is listening on port ' + port);
});

// Mount the router middleware
app.use('/' , require('./routes/mainRoutes'));

app.listen(port, () => {
  console.log('Server is listening on port ', port);
});
