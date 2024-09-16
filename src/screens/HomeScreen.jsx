import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import StepCounter from "../components/StepCounter";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [steps, setSteps] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo de Atividades</Text>

      <View style={styles.stepsCard}>
        <Text style={styles.stepsLabel}>Passos de Hoje:</Text>
        <StepCounter steps={steps} setSteps={setSteps} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddExercise")}
      >
        <FontAwesome name="plus" size={24} color="white" />
        <Text style={styles.buttonText}>Registrar Novo Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("ActivityDetail")}
      >
        <FontAwesome name="line-chart" size={24} color="white" />
        <Text style={styles.buttonText}>Visualizar Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  stepsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  stepsLabel: {
    fontSize: 20,
    marginBottom: 10,
    color: "#666",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#3f51b5",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default HomeScreen;
