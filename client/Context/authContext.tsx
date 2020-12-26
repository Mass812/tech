import React from 'react'

interface UserContextProps {  
//userToken: string | null
//setUserToken: (e: EventTarget)=>void
  
}

interface  AuthProviderProps {  
userName: string
password: string
member: true
 }



export const AuthContext = React.createContext<UserContextProps>({userToken: 'here'})


  
   
     


export const  AuthProvider : React.FC < AuthProviderProps> = ( {children}) => {

    return (

       <AuthContext.Provider value={{userToken: 'Matt Wellman'}}>
         {children}
       </AuthContext.Provider>

)}



