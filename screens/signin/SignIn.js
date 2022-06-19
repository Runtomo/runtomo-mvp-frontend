import { StyleSheet, View, SafeAreaView, Text, Linking } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Color from "../../assets/themes/Color.js";

const SignIn = () => {
  const navigation = useNavigation();
  const { setUser, signInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({
    isTriggered: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = () => {
    signInUser({ email, password });
    navigation.navigate("SignIn", { screen: "Home" });

    // Mockdata logic. Leave as a reference
    // if (true) {
    //   setUser({ id: 2, username: "WayneWadeRuns" });
    //   navigation.navigate("SignIn", { screen: "Home" });
    // } else {
    //   setUser("");
    // }
  };

  const validateEmail = (text) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      const updatedEmailError = { isTriggered: false, message: "" };
      setEmailError(updatedEmailError);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.emailFieldWrapper}>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          style={{ height: 50, backgroundColor: Color.White }}
          error={false}
          errorText={"TESTING"}
          onChangeText={(text) => {
            if (emailError.isTriggered === false) {
              const updatedEmailError = {
                isTriggered: true,
                message: "Please enter a valid email.",
              };
              setEmailError(updatedEmailError);
            }
            validateEmail(text);
            return setEmail(text);
          }}
        />
        <Text style={styles.emailErrorMessage}>
          {emailError.isTriggered && emailError.message}
        </Text>
      </View>
      <View style={styles.passwordFieldWrapper}>
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          textContentType="password"
          secureTextEntry={true}
          style={{ height: 50, backgroundColor: Color.White }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Text
        style={styles.forgotPasswordLink}
        onPress={() => alert("Forgot Password!")}
      >
        Forgot password?
      </Text>
      <View style={styles.signInBottomWrapper}>
        <Button
          mode="contained"
          uppercase={false}
          color={Color.PrimaryMain}
          style={{ borderRadius: 10 }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 18,
          }}
          contentStyle={{
            padding: 5,
          }}
          onPress={() => handleSignIn()}
        >
          Sign In
        </Button>
        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    position: "absolute",
    width: 305,
    height: 34,
    top: 213,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 20,
    letterSpacing: 0.36,
    alignSelf: "center",
  },
  emailFieldHeader: {
    marginBottom: 10,
  },
  emailFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 74,
    top: 304,
    alignSelf: "center",
  },
  emailErrorMessage: {
    marginTop: 4,
    color: "#c7254e",
  },
  passwordFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 70,
    top: 398,
    alignSelf: "center",
  },
  forgotPasswordLink: {
    position: "absolute",
    color: Color.PrimaryMain,
    top: 470,
    fontSize: 15,
    left: 230,
  },
  signInBottomWrapper: {
    position: "absolute",
    width: 315,
    height: 101,
    top: 525,
    borderRadius: 10,
    marginHorizontal: 20,
    fontWeight: "500",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  signUpText: {
    alignSelf: "center",
    fontWeight: "500",
    color: "rgba(60, 60, 67, 0.7)",
    fontSize: 15,
  },
  signUpLink: {
    color: Color.PrimaryMain,
    fontSize: 15,
  },
});
