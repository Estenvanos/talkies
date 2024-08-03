import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/appwrite/api";

const AuthContext = createContext();

const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    profilephoto: "",
    profilewallpaper: "",
    bio: "",
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            setIsLoading(true);
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    profilephoto: currentAccount.profilephoto,
                    profilewallpaper: currentAccount.profilewallpaper,
                    bio: currentAccount.bio,
                    chats: currentAccount.chats,
                    friends: currentAccount.friends,
                    status: currentAccount.status
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback && cookieFallback !== "[]") {
            checkAuthUser();
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, checkAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserContext = () => useContext(AuthContext);
export default AuthProvider;
