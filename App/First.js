import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import auth from "@react-native-firebase/auth"

const First = ({ navigation }) => {
  const [number, setNumber] = useState("")
  const [confirm, setConfirm] = useState(null)

  const signIn = async() => {
    const confirmation = await auth().signInWithPhoneNumber(`+91${number}`)
    if(confirmation){
      try{
        setConfirm(confirmation)
        navigation.navigate("Second", {confirm: confirmation, number})
      } catch(e){
        console.error(e)
      }
    } 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../App/Assets/logo.png")} />
      <Text style={styles.txt}>Enter Mobile Number for Verification</Text>
      <View style={styles.inpContainer}>
        <Text style={[styles.txt, styles.colorGray]}>Mobile Number</Text>
        <TextInput
          placeholder="Enter your mobile number"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
          value={number}
          onChangeText={setNumber}
        />
      </View>
      <View style={styles.btnCont}>
        <TouchableOpacity
          disabled={number.length !== 10 ? true : false}
          // onPress={() => navigation.navigate("Second", { number })}
          onPress={signIn}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default First

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 45,
    flex: 1,
  },
  txt: {
    paddingTop: 45,
    fontSize: 16,
  },
  inpContainer: { width: "90%", alignItems: "flex-start" },
  input: {
    paddingTop: 10,
    fontSize: 16,
  },
  btn: {
    paddingVertical: 19,
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 19,
  },
  btnCont: {
    width: "90%",
    position: "absolute",
    bottom: 12,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  colorGray: {
    color: "gray",
  },
})
