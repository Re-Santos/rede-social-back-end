
import express from 'express';

const app = express();


app.get('/ping', (req, res) => {
  res.send('pong!');
});

// app.listen(Number(process.env.PORT || 3003), () => {
//     console.log(`Port ${process.env.PORT} connected.`)
// })

app.listen(Number(3003), () => {
    console.log(`Port ${3003} connected.`)
})