const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.kcgkpjb.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length < 5) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const input_name = process.argv[3]
    const input_number = process.argv[4]

    const generateId = () => {
        const range = 100000
        return String(Math.trunc(Math.random() * range))
    }

    const person = new Person({
        id: generateId(),
        name: input_name,
        number: input_number,
    })

    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}