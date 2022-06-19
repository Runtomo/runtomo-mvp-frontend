import React, { useState, useEffect, createContext } from "react";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../axios/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const createUser = async ({ username, email, password }) => {
    try {
      const response = await axiosInstance.post("/auth/signup/", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      // await loginUser(e);
    } catch (e) {
      alert("Something went wrong. Please try again!");
    }
  };

  const signInUser = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(jwt_decode(data.access));
        await SecureStore.setItemAsync(
          "access_token",
          JSON.stringify(data.access)
        );
        await SecureStore.setItemAsync(
          "refresh_token",
          JSON.stringify(data.refresh)
        );
      }
    } catch (e) {
      alert("Something went wrong. Please try again!");
    }
  };

  const signOutUser = async () => {
    setUser("");
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
  };

  const deleteAccount = async () => {
    await axiosInstance.delete("/api/delete_account", {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? `JWT ${String(localStorage.getItem("access_token"))}`
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  };

  const contextData = {
    createUser,
    user,
    setUser,
    signInUser,
    user,
    signOutUser,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
