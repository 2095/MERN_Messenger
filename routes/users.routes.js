const {Router} = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');

const usersRouter = Router();

// /api/users/findUsers
usersRouter.post(
    '/findUsers',
    async (req, res) => {
        try{
            const {partialName} = req.body;

            usersList = await User.aggregate([
                { $match : { login : {
                    $regex: partialName,
                    $options: 'i'
                    }} }
              ]);

            res.json(usersList);

        } catch(e){
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    }
);

// /api/users/createContacts
usersRouter.post(
    '/createContacts',
    async (req, res) => {
        try{
            const {contact1, contact2} = req.body;

            const newContact = await Contact.findOne({$and: [{contact1}, {contact2}]});

            if (newContact){
                return res.status(200).json({message: "Contacts already exist"})
            }
            else{
                const newContact1 = new Contact({contact1: contact1, contact2: contact2});
                const newContact2 = new Contact({contact1: contact2, contact2: contact1});

                await newContact1.save();
                await newContact2.save();

                return res.json(newContact1)
            }

        } catch(e){
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    }
);

// /api/users/getContacts
usersRouter.post(
    '/getContacts',
    async (req, res) => {
        try{
            const {contact1} = req.body;

            const contactList = await Contact.find({contact1});

            return res.json(contactList);

        } catch(e){
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    }
);

module.exports = usersRouter;