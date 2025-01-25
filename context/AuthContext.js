import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadTokens = async () => {
            const storedTokens = await AsyncStorage.getItem('authTokens');
            if (storedTokens) {
                const tokens = JSON.parse(storedTokens);
                setAuthTokens(tokens);
                try {
                    setUser(jwtDecode(tokens.access));
                } catch (error) {
                    console.error("Invalid token:", error);
                    logoutUser();
                }
            }
            setLoading(false);
        };
        loadTokens();
    }, []);

    const loginUser = async (email, password, navigation) => { // Expect navigation as an argument
        try {
            console.log("Sending login request with:", email, password);

            const response = await fetch('http://192.168.1.8:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login response data:", data);
                const decodedUser = jwtDecode(data.access);
                setAuthTokens(data);
                setUser(decodedUser);
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
                navigation.navigate("HomePage"); // Navigate after successful login
            } else {
                const errorData = await response.json();
                console.log("Response status:", response.status);
                console.log("Response body:", errorData);
                alert(`Login failed: ${errorData.detail || "Invalid credentials"}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const updateToken = async () => {
        try {
            const response = await fetch('http://192.168.1.8:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: authTokens?.refresh,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthTokens(data);
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error('Error updating token:', error);
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 240000); // 4 minutes
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    const logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        await AsyncStorage.removeItem('authTokens');
    };

    const ContextData = {
        loginUser, // Now expects navigation as an argument
        logoutUser,
        authTokens,
        user,
    };

    return (
        <AuthContext.Provider value={ContextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};