const Persons = ({person, remove}) =>  
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={remove}>delete</button>
    </p>

export default Persons