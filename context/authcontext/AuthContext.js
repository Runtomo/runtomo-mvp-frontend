import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "../../helpers/axios";
import * as RootNavigation from "../../navigations/RootNavigator.js";
import { Alert } from "react-native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [idForProfile, setIdForProfile] = useState("");
  const [userToBeRegistered, setUserToBeRegistered] = useState({});

  const createUser = async ({ username, email, password, image }) => {
    try {
      await axiosInstance.post("/auth/signup/", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        image: image,
      });

      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const data = response.data;
        const userId = jwt_decode(data.access)["user_id"];
        setIdForProfile(userId);
        await AsyncStorage.setItem(
          "access_token",
          JSON.stringify(data.access)
        );
        await AsyncStorage.setItem(
          "refresh_token",
          JSON.stringify(data.refresh)
        );
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again!");
    }
  };

  const createUserProfile = async ({
    date_of_birth,
    run_frequency,
    estimated5k,
    estimated10k,
    userId,
    email,
    password,
    image,
    description,
  }) => {
    try {
      const body = {
        date_of_birth,
        run_frequency,
        estimated5k,
        estimated10k,
        userId,
        image,
        description,
      };
      const userProfileResponse = await axiosInstance.post(
        "/users/profile",
        body
      );
    } catch (e) {
      Alert.alert("Error", e.response.data, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
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
        const userId = jwt_decode(data.access)["user_id"];
        setUser({ id: userId });

        await AsyncStorage.setItem(
          "access_token",
          JSON.stringify(data.access)
        );
        await AsyncStorage.setItem(
          "refresh_token",
          JSON.stringify(data.refresh)
        );
      }
    } catch (e) {
      Alert.alert("Error", e.response.data.detail, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      throw new Error(e);
    }
  };

  const signOutUser = async () => {
    try {
      setUser("");
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      RootNavigation.navigate("AuthSelection", { tokenExpired: true });
    } catch (e) {
      alert("Something went wrong. Please try again!");
    }
  };

  const updateDBUserInfo = async (userUpdates) => {
    try {
      const response = await axiosInstance.patch("/auth/update/", {
        email: userUpdates.email,
        username: userUpdates.username,
      });
      if (response.status === 200) {
        const data = response.data;
      }
    } catch (e) {
      console.log("🍎 updateDBUserInfo() did not work correctly.");
      console.log("🍎 error for updateDBUserInfo():", e);
      Alert.alert("Error", e.response.data.detail, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  };

  const updateDBUserProfile = async (userUpdates) => {
    try {
      const profileId = user["profile"]["id"];
      const response = await axiosInstance.patch(
        `/users/profile/${profileId}`,
        {
          ...userUpdates["profile"],
        }
      );
      if (response.status === 200) {
        const data = response.data;
      }
    } catch (e) {
      console.log("🍎 updateDBUserProfile() did not work correctly.");
      console.log("🍎 erorr for updateDBUserProfile():", e);
      Alert.alert("Error", e.response.data.detail, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  };

  const contextData = {
    createUser,
    user,
    setUser,
    signInUser,
    signOutUser,
    createUserProfile,
    idForProfile,
    userToBeRegistered,
    setUserToBeRegistered,
    updateDBUserInfo,
    updateDBUserProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
