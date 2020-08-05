const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes/auth.routes');

const app = express();
app.use(express.json({ extended: true }));

const port = config.get('port');
const mongoUrl = config.get('mongoUrl');


app.use('/api/auth', routes);

async function start(){
  try{
    await mongoose.connect(mongoUrl, {
       useNewUrlParser: true,
       useUnifiedTopology: true
    });
    app.listen(port, () => console.log(`${port}`));
  }
  catch(e){
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
