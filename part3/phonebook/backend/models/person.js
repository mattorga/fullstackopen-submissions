const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v){
                return /^\d{2,3}-\d+$/.test(v) && v.replace(/-/g, '').length >= 8;
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
})

module.exports = mongoose.model('Person', personSchema)