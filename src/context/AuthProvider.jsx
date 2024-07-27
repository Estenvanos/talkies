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
                    bio: currentAccount.bio,
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
        if (
            localStorage.getItem("cookieFallback") === "[]" ||
            localStorage.getItem("cookieFallback") === null
        ) {
            navigate("/sign-in");
        } else {
            checkAuthUser();
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
