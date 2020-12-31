import React, {useState} from 'react'

interface UserContextProps {  
//userToken: string | null
//setUserToken: (e: EventTarget)=>void
  
}

interface  NavigationParamProviderProps {  


 }



export const NavigationParamContext = React.createContext<UserContextProps>('')

export const  NavigationParamProvider : React.FC < NavigationParamProviderProps> = ( {children}) => {
const [param, setParam] = useState<string>()
    return (

       <NavigationParamContext.Provider value={[param, setParam]}>
         {children}
       </NavigationParamContext.Provider>

)}
