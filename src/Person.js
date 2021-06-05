import React from 'react'

const Person = ({ persons, delPer }, { numbers, comments }) => {
    return (
    <li className="namelist"> {persons.name} <span id="spacea"> {persons.numbers} </span> <span id="spaceb">{persons.comments} </span>
    <button className = "design" id="btn" id="delbtn" onClick = {delPer}> Delete </button>
    </li>
    )
  }

  export default Person