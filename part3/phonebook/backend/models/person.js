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
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)

// if (process.argv.length < 4) {
//     Person.find({}).then(result => {
//         console.log("phonebook:")
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
// } else {
//     const input_name = process.argv[2]
//     const input_number = process.argv[3]

//     const generateId = () => {
//         const range = 100000
//         return String(Math.trunc(Math.random() * range))
//     }

//     const person = new Person({
//         id: generateId(),
//         name: input_name,
//         number: input_number,
//     })

//     person.save().then(result => {
//         console.log(`added ${person.name} ${person.number} to phonebook`)
//         mongoose.connection.close()
//     })
// }