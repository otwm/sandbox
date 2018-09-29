const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.text('ok');
});

app.listen(3000, ()=>{
  console.log('ok');
});