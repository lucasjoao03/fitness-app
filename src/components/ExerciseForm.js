import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, Alert } from "react-native";

const ExerciseForm = ({ onSave }) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");

  const handleSave = () => {
    if (!exercise || !duration) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    onSave({ exercise, duration });
    setExercise("");
    setDuration("");
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Tipo de Exercício:</Text>
      <TextInput
        style={styles.input}
        value={exercise}
        onChangeText={setExercise}
        placeholder="Corrida, caminhada, etc."
      />
      <Text style={styles.label}>Duração (min):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Ex: 30"
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ExerciseForm;
