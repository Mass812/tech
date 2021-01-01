import React, {useState} from 'react'

interface UserContextProps {  
//userToken: string | null
//setUserToken: (e: EventTarget)=>void
  
}

interface  hideBottomNavigatorContextProviderProps {  
hidden: boolean

 }

export const hideBottomNavigatorContext = React.createContext<UserContextProps>('')

export const  hideBottomNavigatorContextProvider : React.FC < hideBottomNavigatorContextProviderProps> = ( {children}) => {
const [hidden, setHidden] = useState<boolean>(false)
    return (

       <hideBottomNavigatorContext.Provider value={[hidden, setHidden]}>
         {children}
       </hideBottomNavigatorContext.Provider>

)}
