const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const invoiceSchema = new mongoose.Schema({
    date: Date,
    releaseNumber: String,
    masterBL: String,
    container: String,
    houseBL: String,
    pieces: String,
    weight: String,
    cube: String,
    chargeAmount: [{
        reason: String,
        amount: String
    }],
    status: String
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

app.post('/invoices', async (req, res) => {
    const {
        date,
        releaseNumber,
        masterBL,
        container,
        houseBL,
        pieces,
        weight,
        cube,
        chargeAmount,
        status
    } = req.body;

    const invoice = new Invoice({
        date,
        releaseNumber,
        masterBL,
        container,
        houseBL,
        pieces,
        weight,
        cube,
        chargeAmount,
        status
    });

    try {
        const savedInvoice = await invoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error('Error saving invoice:', error);
        res.status(400).send(error);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});