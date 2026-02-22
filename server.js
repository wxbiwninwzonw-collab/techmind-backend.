const express = require('express');
const cors = require('cors'); // لازم السطر ده يكون موجود
const app = express();

app.use(cors()); // وده أهم سطر عشان يسمح للتطبيق يكلم السيرفر
app.use(express.json());
