// import React, { createContext, useState, useContext ,useEffect} from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store the logged-in user's details

//     // Use useEffect to set user from localStorage on component mount
//   useEffect(() => {
//       const savedUser = localStorage.getItem("user");
//       if (savedUser) {
//         setUser(JSON.parse(savedUser)); // If user data exists, set it
//       }
//   }, []); // Empty dependency array means this runs once on mount
  

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
//   };
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // Remove user from localStorage
//   };
//   // const login = (userData) => setUser(userData); // Function to update the user state
//   // const logout = () => setUser(null); // Function to clear the user state

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the logged-in user's details
  const [loading, setLoading] = useState(true); // To handle loading state while checking auth status

  // Use useEffect to check if the user is logged in based on cookies
  useEffect(() => {
    // console.log("useEffect triggered"); 
    const checkAuthStatus = async () => {
      try {
        // Make an API call to verify the user with the access token from cookies
        const response = await axios.get('http://localhost:8000/api/verify-jwt', { withCredentials: true });
        // console.log(response.data.data.user);
        setUser(response.data.data.user); // If verified, set the user data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If the access token is invalid/expired, try refreshing the token
          try {
            const refreshResponse = await axios.post('http://localhost:8000/api/refresh-token', {}, { withCredentials: true });
            setUser(refreshResponse.data.user); // If token is refreshed, set the user data
          } catch (refreshError) {
            console.log('Failed to refresh token:', refreshError);
            logout(); // Log the user out if refreshing fails
          }
        }
      }
      setLoading(false); // Stop loading after checking auth status
    };

    checkAuthStatus();
  }, []); // Run once on mount

  const login = (userData) => {
    setUser(userData);
    // No need to store in localStorage, as we're using cookies for storage
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

