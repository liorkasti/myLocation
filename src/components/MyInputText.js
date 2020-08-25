import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import toastMaker from '../utils/toastMaker';

const MyInputText = props => {
  const [enteredInput, setEnteredInput] = useState("");

  useEffect(() => {
    // console.warn("CategoryInput props: ", props);
  }, [])

  // console.warn("enteredText: ", enteredInput);

  const textInputHandler = enteredText => {
    setEnteredInput(enteredText);
  };

  const addTextHandler = () => {
    // console.warn("enteredText: ", enteredInput);
    if (enteredInput.length > 0) {
      props.onAdd(enteredInput);
      setEnteredInput('');
    } else {
      // TODO: Fix Toast No name has been ebtered. https://www.npmjs.com/package/react-native-toast-message
      Alert.alert("No input.");
      console.log("No name has been entered.");
      toastMaker("No name has been entered");
      setEnteredInput('');
      props.reloadStorage();
    }

  }

  return (
    <View style={styles.container}>
      {/* TODO: Add dinamic screen title for the message below*/}
      {/* <Text style={styles.textDialog}>Create a new {props.screen}</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Category name"
          style={styles.input}
          onChangeText={textInputHandler}
          value={enteredInput}
        />
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={props.onDismiss}
          style={styles.cancleButton} >
          <Text style={styles.textButton}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={addTextHandler} style={styles.addButton} >
          <Text style={styles.textButton}> ADD</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: 300,
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.7,
    padding: 10,
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-around',
  },
  cancleButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 0.7,
    width: '45%',
  },
  addButton: {
    backgroundColor: "rgba(0,88,155,1)",
    padding: 10,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 0.7,
    width: '45%',
  },
  textButton: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default MyInputText;