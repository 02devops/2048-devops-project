const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

AWS.config.update({ region: 'ap-south-1' });

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = 'GameScores';

app.post('/api/score', async (req, res) => {
  try {
    const { playerId, score } = req.body;

    if (!playerId || score === undefined) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    await dynamo.put({
      TableName: TABLE,
      Item: {
        playerId,
        score,
        timestamp: Date.now()
      }
    }).promise();

    res.json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/scores', async (req, res) => {
  const data = await dynamo.scan({ TableName: TABLE }).promise();
  res.json(data.Items);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
