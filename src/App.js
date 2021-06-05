import React, { useEffect, useState } from 'react'
import axios from 'axios'
import phoneService from './services/phone'
import Person from './Person'
import phone from './services/phone'

const Notification = ({ note }) => {
  if(note === null){
  return null
  }
  return (
    <div className="notification">
      {note}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [numbers, setNumbers] = useState([])
  const [comments, setComments] = useState([])
  const [note, setNote] = useState()
  const addPerson =(event) =>{
    event.preventDefault()
  const nameObj = {
    name: newName,
    numbers: numbers,
    comments: comments,
    date: new Date().toISOString(),
    id: persons.length+1,
  }
  phoneService
  .create(nameObj)
  .then(returnPer=>{
    setPersons(persons.concat(returnPer))
    setNewName('')
    setNumbers('')
    setComments('')
    setNote(
    `Added ${nameObj.name} to the contact list`
  )
  setTimeout(() => {
    setNote(null)
  }, 4000);
  })
  
}

const deletePerson = (id) =>{
  phoneService
  .update(id)
  .then(
    returnedPer => { 
      setPersons(persons.filter(p=>p.id!==id));
    }
    )
}

  const handlePersonname = (event) =>{
    setNewName(event.target.value)
  }
  const handlePersonnumber = (event) =>{
    setNumbers(event.target.value)
  }
  const handleComment = (event) =>{
    setComments(event.target.value)
  }


  useEffect(() =>{
    phoneService
    .getAll()
    .then(initialPer => {
      setPersons(initialPer)
    })
  },[])
  
  return (
    <div>
      <Notification note={note} />
      <h2 className="design">Phonebook</h2>
      <form className = "design" onSubmit = {addPerson}>
        <div className="input">
          Name: <input className = "boxes" value = {newName} onChange={handlePersonname}/>
        </div>
        <div className="input">
          Number: <input className = "boxes" value = {numbers} onChange={handlePersonnumber}/>
        </div>
        <div className="input">
          Comments: <input className = "boxes" value = {comments} onChange={handleComment}/>
        </div>
        <div>
          <button id="btn" type="submit">Add</button>
          </div>
      </form>
      <h2 className="design">Numbers</h2>
    
      
      {persons.map( persons => <Person key = {persons.id} persons = {persons} delPer={() => deletePerson(persons.id)}/>)}
    </div>
  )
}

export default App