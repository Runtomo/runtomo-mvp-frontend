import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { format } from "date-fns";
import Colors from "../../assets/styles/colors.js";
import LongButton from "../../components/LongButton.js";

const CreateConfirmationScreen = ({ navigation, newEvent }) => {
  return (
    <View style={styles.container}>
      <Card style={[styles.card, styles.cardTop]} onPress={() => {}}>
        <Card.Content>
          <Title style={styles.cardTopTitle}>Congratulations</Title>
          <Paragraph style={styles.paragraph}>
            Your Event is live now!
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Don't forget to share with everyone. Thank you!
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.cardBottom]} onPress={() => {}}>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 175 }}
        />
        <Card.Content>
          <Title>{newEvent.eventTitle}</Title>
          <Paragraph>{newEvent.area}</Paragraph>
          <Paragraph>
            {format(new Date(newEvent.date), "MMM d, yyyy")} at{" "}
            {format(new Date(newEvent.time), "p")}
          </Paragraph>
        </Card.Content>
      </Card>
      <LongButton
        buttonHandler={() => {
          Alert("Some edit page");
        }}
        buttonColor={Colors.secondaryColor}
        buttonText="Edit Event"
      />
      <LongButton
        buttonHandler={() => {
          navigation.navigate("SoleMates");
        }}
        buttonColor={Colors.primaryColor}
        buttonText="Done"
      />
    </View>
  );
};

export default CreateConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fill,
    paddingTop: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginBottom: 10,
    // padding: 10,
  },
  cardTop: {
    height: 170,
    padding: 10,
  },
  cardTopTitle: {
    textAlign: "center",
    color: Colors.primaryColor,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBottom: {
    height: 270,
  },
  paragraph: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
