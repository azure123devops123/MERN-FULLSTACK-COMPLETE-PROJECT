import { useEffect } from "react"         // import useEffect hook and useState hook
// WE DO NOT NEED TO IMPORT useState ANYMORE BECAUSE WE ARE USING GLOBAL CONTEXT STATE INSTEAD OF LOCAL STATE.
import { useUsersprofileContext } from "../hooks/useUsersprofileContext"  
// WE ARE FETCHING ALL THE Usersprofile INSIDE THIS HOME PAGE AND THEN WE UPDATING SOME LOCAL COMPONENT STATE TO STORE THOSE WORKOUTS BUT WE DO NOT WANT TO DO THAT ANY MORE BECAUSE WE HAVE THAT GLOBAL CONTEXT STATE FOR THE Usersprofile.
// SO NOW WE ARE GOING TO USE THE HOOK TO CONSUME OUR CONTEXT FOR THE usersprofile which will provide us two values (dispatch function) and (state object)

//components 
import UserprofileDetails from "../components/UserprofileDetails"
import UserdetailForm from "../components/UserdetailForm"

// create a blank react component for the Home page
// We are creating a function that will return the template 
const Home = () => {    
    // Creating the local state first with the empty value
    // Once the below response is ok then we will update the value of usersprofile using setUsersprofile.
    // This value will the array of json data coming from the backend userprofileController.js file inside controllers directory.    
//    const [usersprofile, setUsersprofile] = useState(null)  // WE DO NOT NEED BECAUSE WE ARE USING GLOBAL CONTEXT STATE INSTEAD OF LOCAL STATE.
   const { usersprofile, dispatch } = useUsersprofileContext()  // USE useUsersprofileContext HOOK AND WE HAVE TO DESTRUCTURE A COUPLE OF THINGS IT PROVIDES US WITH.

    // We are using effect hook to fetch the and also state hook to save the state.
    // useEffect will fire a function once when the component is rendered 
    useEffect(() => {
      const fetchUsersprofile = async () => {          // always create this function inside useEffect
        const response = await fetch('/api/usersprofile')      // For local development Server, we have to write the backend server url and then the uri
        const json = await response.json()           // Now we should have a array of objects in here userprofile objects
        
        // now we have to check if the response if ok first then update the local state
        if (response.ok){
         // setUsersprofile(json)           // update the local state
         // WE DO NOT NEED setUsersprofile(json) BECAUSE WE ARE USING GLOBAL CONTEXT STATE INSTEAD OF LOCAL STATE.
         // IF THE RESPONSE IS OK WE CAN DISPATCH A FUNCTION
         dispatch({type: 'SET_USERSPROFILE', payload: json})
        }
       }

       fetchUsersprofile()         // Now we are calling the above fetchUsersprofile function 
    }, [dispatch])        // this empty array means it will fire only once when the component first renders
    
    // when the component first renders - we can cycle through those  usersprofile down here.
    return (
        <div className="home">
            <div className="usersprofile">
                {usersprofile && usersprofile.map(userprofile => (        // it says that if have a value for usersprofile then start the map through them. inside code will only run it will not null.
                    // <p key={userprofile._id}> {userprofile.name}</p>        // WE HAVE TO START BACKEND SERVER TO MAKE THIS WORK using npm run dev at this stage we will get an error CORS. Its by default blocked for security reasons.
                    <UserprofileDetails key={userprofile._id} userprofile={userprofile} />   // Here we will returning 

                ))}
            </div>
            <UserdetailForm />
        </div>
    )
}

export default Home