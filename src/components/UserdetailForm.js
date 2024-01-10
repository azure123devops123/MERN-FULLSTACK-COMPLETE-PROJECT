// 3- import useState
import { useState } from 'react'
import { useUsersprofileContext } from '../hooks/useUsersprofileContext'   //import the hook

// 1- create a function which will return a template
const UserdetailForm = () => {
  const { dispatch } = useUsersprofileContext()   // invoke that hook

  // 3- first create a state for each of different properties. Initially value will be an empty string.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState('')
  
  // 10- error state with Initial value null.
  const [error, setError] = useState(null)
 
  // tutorial 13/1: we have the empty fields inside json response. so let create some state for that
  const [emptyFields, setEmptyFields] = useState([])   // passing an empty array

  // 5- create handleSubmit function now 
  const handleSubmit = async (e) => {
    e.preventDefault()     //Prevent the default action of the fom being submitted - normally default action is REFRESH the page after submitting
    
    // 6 - Create a dummy object (userdetail) that we are going to send as the body of the request
    const userdetail = {name, email, interests}

    // 7 - Now we want to use the fetch API to send a POST request
    const response = await fetch('/api/usersprofile', {
      method: 'POST',
      body: JSON.stringify(userdetail),         // turn the object into JSON formate before sending it. So, it will change the object (userdetail) into a JSON STRING and send as a body
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // 8- We are getting back json and string into a constant (json)
    const json = await response.json()

    //9- check if the response is NOT OK.
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    // 11- check if the response is OK then reset the form again with an empty string.
    if (response.ok){
      setEmptyFields([])
      setError(null)
      setName('')
      setEmail('')
      setInterests('')
      // console.log('New userdetail Added:', json)
      dispatch({type: 'CREATE_USERPROFILE', payload: json})
    }

  }

    return (
        // 4- we will create a form now - all the input values will be stored in the above state variables
        // On submit of this form we will fire some kind of function called handleSubmit

        <form className='create' onSubmit={handleSubmit}>
          <h3>Add a New Userdetail</h3>
                    
          <label>User Name:</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error': ''}// passing dynamic value
            // Above emptyFields.includes('name') will be True OR False
            // If its True then class we want to give this input field is error
            // But if its false then we are passing empty string
            // We can style this error class into the index.css file
          />

          <label>Email Address:</label>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('email') ? 'error': ''} 
          />

          <label>Interests:</label>
          <input
            type='text'
            onChange={(e) => setInterests(e.target.value)}
            value={interests}
            className={emptyFields.includes('interests') ? 'error': ''}
          />
          
          <button>Add User Details</button>
          {error && <div className="error">{error}</div>}
        </form>

    )
}



// 12- Export it from this file because we want to use it inside the home page (Home.js).
export default UserdetailForm 