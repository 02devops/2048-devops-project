const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-south-1'
});

app.get('/api/health', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/score', async (req, res) => {
  const { playerId, score } = req.body;

  const params = {
    TableName: 'GameScores',
    Item: {
      playerId,
      score,
      timestamp: Date.now()
    }
  };

  try {
    await dynamo.put(params).promise();
    res.send('Score saved successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const data = await dynamo.scan({ TableName: 'GameScores' }).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
