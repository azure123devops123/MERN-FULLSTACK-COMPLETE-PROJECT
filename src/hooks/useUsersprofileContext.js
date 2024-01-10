// 10 - 
import { UsersprofileContext } from "../context/UsersprofileContext"           // import the actual context that we created at the top of the file (NOT THE PROVIDER COMPONENT) 
import { useContext } from "react"  // import useContext hook - we are going to use this context inside our hook. 


export const useUsersprofileContext = () => {     //hook function - called useUsersprofileContext
  const context = useContext(UsersprofileContext)  // pass the context object inside the hook so, we have now the object stored inside context constant.

  if(!context) {    // check that we are within the scope of the context we are using or trying to use - if we do not have value then we can throw the error.
    throw Error('useUsersprofileContext must be used inside an UsersprofileContextProvider')
  }

  return context    // we can return this state
}


// NOTE:- Now we can go ahead and can consume our context using useUsersprofileContext hook inside our component. So go to the Home.js inside pages directory.
