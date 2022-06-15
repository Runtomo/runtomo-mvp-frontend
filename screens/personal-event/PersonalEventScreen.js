import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";

const PersonalEventScreen = ({ navigation }) => {
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      ward: "Shibuya",
      date: "2022-07-17T14:02:55.300Z",
      time: "2022-07-17T14:02:55.300Z",
      user: { id: 1, username: "Kumiko" },
      participants: [2],
      owner_id: 1,
    },
    {
      id: 2,
      title: "Tama river run",
      ward: "Shibuya",
      date: "2022-08-20T19:30:45.300Z",
      time: "2022-08-20T19:30:45.300Z",
      user: { id: 2, username: "Wade" },
      participants: [],
      owner_id: 2,
    },
    {
      id: 3,
      title: "Kanda river run",
      ward: "Shinjuku",
      date: "2022-09-02T12:03:55.300Z",
      time: "2022-09-02T12:03:55.300Z",
      user: { id: 3, username: "Kei" },
      participants: [],
      owner_id: 3,
    },
  ];

  const listTab = [
    {
      status: "All",
    },
    {
      status: "Owned",
    },
    {
      status: "Joined",
    },
  ];

  const [mySessions, setMySessions] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: 2 });
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (currentUser) {
      handleFilter(status);
    }
  }, []);

  const handleFilter = (status) => {
    setStatus(status);

    const userSessions = mockdata.filter((session) => {
      switch (status) {
        case "Owned":
          if (session.owner_id === 2) {
            return session;
          }
          break;
        case "Joined":
          if (session.participants.includes(2)) {
            return session;
          }
          break;
        default:
          if (session.owner_id === 2 || session.participants.includes(2)) {
            return session;
          }
          break;
      }
    });
    setMySessions(userSessions);
  };

  const selectEvent = (eventData) => {
    navigation.navigate("Event Details", {
      eventData: eventData,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.listTab}>
        {listTab.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btnTab, tab.status === status && styles.btnActive]}
            onPress={() => handleFilter(tab.status)}
          >
            <Text style={styles.textTab}>{tab.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.eventCardWrapper}>
            {mySessions.map((session, id) => {
              return (
                <EventCard
                  isHomePageCard={true}
                  style={styles.eventCard}
                  selectEvent={selectEvent}
                  key={id}
                  event={session}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalEventScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  eventCardWrapper: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  listTab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Color.GrayMedium,
  },
  btnTab: {
    padding: 10,
    width: 110,
  },
  btnActive: {
    backgroundColor: Color.GrayDark,
  },
  textTab: {
    textAlign: "center",
    fontWeight: "500",
  },
});
