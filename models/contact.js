const {Schema, model} = require('mongoose')

const schema = new Schema({
  contact1: {type: String, required: true},
  contact2: {type: String, required: true}
})

module.exports = model('Contact', schema)