import express from 'express';
import bodyParser from 'body-parser';
import blockchain from './blockchain.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const chain = [blockchain.createGenesisBlock()];

app.get('/', (req, res) => {
    console.log('GET request received');
    res.json(chain);
});

app.post('/', (req, res) => {
    console.log('POST request received');
    const index = chain.length;
    const timestamp = new Date().toString();
    const data = req.body.data;
    const previousHash = blockchain.getLatestBlock(chain).hash;

    const newBlock = blockchain.createBlock(index, timestamp, data, previousHash);
    blockchain.addBlock(chain, newBlock);
    console.log('New block added');
    res.json(newBlock);
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`)
})