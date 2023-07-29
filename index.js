const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.listen(port)

const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let purchaseDB = [];
let costDB = Array(10).fill(500);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const customSort = (a, b) => {
    const importanceA = parseInt(a.importance);
    const importanceB = parseInt(b.importance);

    return importanceB - importanceA; // Sort in descending order
};

app.post('/api/add_element', (req, res) => {
  purchaseDB.push(req.body);
  purchaseDB.sort(customSort);
  res.sendStatus(200);
})

app.post('/api/get_element', (_, res) => {
  res.status(200).send(purchaseDB);
})

app.post('/api/add_supporter', (req, res) => {
  purchaseDB[parseInt(req.body.nowEditing)].supporter = req.body.supporterName;
  res.sendStatus(200);
})

app.post('/api/done', (req, res) => {
  purchaseDB[parseInt(req.body.id)].done = req.body.done ? 'true' : 'false';
  res.sendStatus(200);
})

app.get('/api/delete_item', (req, res) => {
    purchaseDB.splice(req.query.id, 1);
    res.status(200).send({ message: 'Success' });
})

app.post('/api/add_cost', (req, res) => {
    let moneyLeft = costDB[parseInt(req.body.nowEditing)];
    moneyLeft -= parseInt(req.body.cost);
    costDB[parseInt(req.body.nowEditing)] = moneyLeft;

    purchaseDB[parseInt(req.body.index)].price = req.body.cost;

    res.sendStatus(200);
})

app.post('/api/get_money', (_, res) => {
    res.status(200).send(costDB);
})

app.get('/api/reset', (_, res) => {
    costDB = Array(10).fill(500);
    res.sendStatus(200);
})