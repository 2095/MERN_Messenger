const {Schema, model} = require('mongoose')

const schema = new Schema({
  textMessage: {type: String, required: true},
  receiver: {type: String, required: true},
  sender: {type: String, required: true},
  time : {type : Date, default: Date.now}
})

module.exports = model('Message', schema)