import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import StepCounter from "../components/StepCounter";

const HomeScreen = ({ navigation }) => {
  const [steps, setSteps] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo de Atividades</Text>

      <StepCounter steps={steps} setSteps={setSteps} />

      <Button
        title="Registrar Novo Exercício"
        onPress={() => navigation.navigate("AddExercise")}
      />

      <Button
        title="Visualizar Detalhes das Atividades"
        onPress={() => navigation.navigate("ActivityDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
