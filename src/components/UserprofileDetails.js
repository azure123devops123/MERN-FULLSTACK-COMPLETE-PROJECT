import { useUsersprofileContext } from '../hooks/useUsersprofileContext'

//date fns - here we are importing the function formatDistanceToNow
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const UserprofileDetails = ({ userprofile }) => {
  const { dispatch } = useUsersprofileContext()

    // Make the handleClick function. Inside this function we want to communicate with our API. 
    const handleClick = async () => {

        // Following will append the id of the usersprofile we want to delete
        const response = await fetch('/api/usersprofile/' + userprofile._id, {  // DELETE REQUEST OBJECT FROM DATABASE IS THE SECOND PARAMETER
            method: 'DELETE'
        })
        const json = await response.json()    // HERE WE HAVE THAT DOCUMENT WHICH IS JUST DELETED
        
        if (response.ok) {      // WE ARE CHECKING IF THE RESPONSE IS OK BECAUSE WE DO NOT WANT TO START DELETING THINGS FROM OUR GLOBAL CONTEXT STATE
          dispatch({type: 'DELETE_USERPROFILE', payload: json})    // HERE WE WANT O DISPATCH SOME KIND OF ACTION SO IMPORT useUsersprofileContext AT THE TOP AND THEN GRAB THE dispatch FUNCTION.
        // AFTER THE ABOVE DISPATCH ACTION NOW WE NEED TO HANDLE THIS DISPATCH INSIDE UsersprofileContext.js file.
        }
    } 

    return (
        <div className="userprofile-details">
            <h4>{userprofile.name}</h4>
            <p><strong> EMAIL: </strong>{userprofile.email}</p>
            <p><strong>INTERESTS: </strong>{userprofile.interests}</p>
            <p>{formatDistanceToNow(new Date(userprofile.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default UserprofileDetails