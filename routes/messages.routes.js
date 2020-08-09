const {Router} = require('express');
const Message = require('../models/Message');

const messageRouter = Router();


// /api/message/createMessage
messageRouter.post(
    '/createMessage',
    async (req, res) => {
        try{
            const {textMessage, receiver, sender} = req.body;

            const message = new Message({textMessage, receiver, sender});

            await message.save(); 

            messageList = await Message.find({$or:[
                {$and: [{receiver: receiver}, {sender: sender}]},
                {$and: [{receiver: sender}, {sender: receiver}]}
            ] });

            res.json(messageList);

        } catch(e){
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    }
);

// /api/message/getMessages
messageRouter.post(
    '/getMessages',
    async (req, res) => {
        try{
            const {receiver, sender} = req.body;

            messageList = await Message.find({$or:[
                {$and: [{receiver: receiver}, {sender: sender}]},
                {$and: [{receiver: sender}, {sender: receiver}]}
            ] });

            res.json(messageList);

        } catch(e){
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    }
);

module.exports = messageRouter;
