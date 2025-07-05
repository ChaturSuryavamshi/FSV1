import {
    createContext,
    useContext,
    useState
} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user , setUser] = useState({
        userID : localStorage.getItem('loggeduser') || null,
        userDeatails : {
            name: "",
            address: "",
            type: "",
            location: "",
            phone: "",
            email: "",
            password: "",
            oname: "",
            ophone: "",
            oemail: "",
          }
    });
    return(
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);