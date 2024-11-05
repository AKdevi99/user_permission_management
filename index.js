const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {exec} = require('child_process');

dotenv.config();


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;