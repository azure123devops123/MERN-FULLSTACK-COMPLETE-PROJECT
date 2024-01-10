// We can't' see the new added user profile without refreshing the page because local user profile isn't being kept in sync with the database collection
// we have to update our user profile state in the home page (Home.js) whenever we add a new user profile.
// We will achieve this by use REACT CONTEXT.
// REACT CONTEXT: its a way we can provide kind of global state to many different components in the application and then we can also update that state by dispatching actions from those components as well.


// 1- Inside this file we can make our context and a context provider component.
// import a function called createContext from react.
import { createContext, useReducer } from 'react'



// 2- Create a NEW CONTEXT by using the invoking the function called createContext.
export const UsersprofileContext = createContext()



// 7 -  usersprofileReducer function which takes two arguments 
// state [THIS STATE IS PREVIOUS RELIABLE STATE BEFORE WE ARE MAKING THE CHANGE IN IT] WHICH IS { usersprofile: null }
// action THIS IS AN OBJECT WE PASS TO dispatch FUNCTION WHICH HAD A type PROPERTY AND ALSO HAD A payload.
export const usersprofileReducer = (state, action) => {
    // ALL THIS IS FOR LOCAL STATE WE ARE NOT INTERACTING WITH THE DATABASE. THIS IS JUST TO KEEP THE LOCAL STATE IN SYNC WITH THE DATABASE.
  switch (action.type) {          // Here we are checking the action type what we actually want to do with the data like may be we want delete oe edit or add a userprofile. Action type will be different for each.
    case 'SET_USERSPROFILE':
      return {                  // we are returning an array of objects
        usersprofile: action.payload
      }
    case 'CREATE_USERPROFILE':
      return {          // we are returning an array which is a single userprofile object 
        usersprofile: [action.payload, ...state.usersprofile]         //  Firstly we are adding action.payload a new object then   ...state.usersprofile   this is the previous states and the usersprofile would be an array of pre-existing userprofile objects.  
      }
    case 'DELETE_USERPROFILE':     // IF THIS IS THE CASE WE ARE RETURNING A NEW OBJECT - WE ARE GOING TO FILTER THROUGH THE CURRENT usersprofile ON THE CURRENT STATE BEFORE WE MAKE THIS CHANGE
      return {
                      // PREVIOUS-STATE . ARRAY-OF-usersprofile . FILTER-THROUGH-THE-USERSPROFILE (FIRE A FUNCTION FOR EACH ONE AND WE RETURN TRUE OR FALSE IF THE IF THE ID THE OF THE EACH INDIVIDUAL USERPROFILE IS THE EQUAL TO THE ID THAT WE WANT TO DELETE)
        usersprofile: state.usersprofile.filter(u => u._id !== action.payload._id)
      }  
    default:
      return state
      // Now go down and provide value to the UsersprofileContext.Provider so its available in other components.     
    }
  }


// 3- Provide that context to our application component tree so that our application components can access it.
export const UsersprofileContextProvider = ({ children }) => {           // create a function 
  // 6- If we want to update the state object we have to call the dispatch function and pass an object as an argument.
  // And this object should have a type property which is normally a string all in caps that describes in words the state change 
  // What we want to make for example CREATE_USERPROFILE if we want to add a new user or SET_USERSPROFILE if we want to fetch all the usersprofile .
  //   dispatch({type: 'CREATE_USERPROFILE'})  OR 
  //   dispatch({type: 'SET_USERSPROFILE'})
  // type is the first property and second property is the payload which represents any data we need to make this change like in this case an array of objects.
  // dispatch({type: 'SET_USERSPROFILE', payload: [{}, {}]})
  // {type: 'SET_USERSPROFILE', payload: [{}, {}]} - THIS ARGUMENT IS CALLED ACTION and dispatch is a FUNCTION.
  // WHEN WE CALL THIS FUNCTION IN TURN OUR usersprofileReducer FUNCTION IS INVOKE  WHICH PASSES THE ACTION INTO THE Reducer FUNCTION SO IT CAN DO ITS THING AND UPDATE THE STATE USING THAT INFORMATION AND DATA.

  // 5 - We have to pass a DYNAMIC STATE VALUE to the UsersprofileContext.Provider so it can be available to our component throughout the application.
  // So, we have to create some state in this custom component using the builtin react hook called (useReducer). 
  // First import it above and then extract state and dispatch, here useReducer is a hook and we are passing a 
  // function called usersprofileReducer and also initial value for state which is an object with a usersprofile property.
  // Important Point:- This useReducer hook will get back the state value ans a function (dispatch) to update that state value.
  const [state, dispatch] = useReducer(usersprofileReducer, {// here we are specifying the initial value for the state as a object 
    usersprofile: null                   
  })

  // 4 - we can destructure the children property, in our case children property presents the app component what we just wrapped inside the index.js file
  return (
    // we are returning a template
    // You can wrap whatever parts of our application needs access to the context. In our case We have to wrap the whole application (whole component tree) inside below.
    // It need to wrap the root app component. (inside the index.js you can see it <App /> component)
    // This <App /> component needs to be wrapped by our context provider component (UsersprofileContextProvider). We have to import it inside index.js and then wrap the <App /> inside UsersprofileContext.
    <UsersprofileContext.Provider value={{ ...state, dispatch }}>           
      { children }
    </UsersprofileContext.Provider>
  )
}

// 8 - WE CAN CONSUME THIS CONTEXT AND BOTH THESE VALUES value={{ ...state, dispatch }} IN OUR COMPONENTS IS PRETTY EASY:
// We can use builtin hook called (use context) and then specify which context we want to use. But I want a custom hook for each context. We can invoke that hook whenever we wanted to use this context. 

// 9 - 
// muhammadjabir@Muhammads-MacBook-Air src % pwd
// /Users/muhammadjabir/Desktop/Azure-Pipeline-Projects/MERN-FULLSTACK-PROJECT/frontend/src
// muhammadjabir@Muhammads-MacBook-Air src % mkdir hooks
// muhammadjabir@Muhammads-MacBook-Air src % cd hooks 
// muhammadjabir@Muhammads-MacBook-Air hooks % touch useUsersprofileContext.js

