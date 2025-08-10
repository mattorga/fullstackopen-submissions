const PersonForm = (props) => {
    return(
      <div>
        <form onSubmit={props.onSubmit}>
          <div>
            name:
            <input value={props.name} onChange={props.onNameChange}/>
          </div>
          <div>
            number:
            <input value={props.number} onChange={props.onNumberChange}/>
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    )
}

export default PersonForm