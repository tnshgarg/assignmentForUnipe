import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import CodeInput from "react-native-code-input"

const Second = ({navigation, route}) => {
  const [number, setNumber] = useState("")
  const confirm = route.params.confirm
  const verify = async() => {
    try{
      let data = await confirm.confirm(number)
      console.log("data: ", confirm)
      navigation.navigate("Success")
    } catch(e){
      console.log(e);
      ToastAndroid.show("Invalid Code", ToastAndroid.SHORT)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../App/Assets/logo.png")} />
      <Text style={styles.txt}>
        Please wait, we will auto verify the OTP sent to {route.params.number}
      </Text>
      <View style={styles.inpContainer}>
        <CodeInput
          borderType={"underline"}
          space={0}
          codeLength={6}
          size={60}
          inputPosition="left"
          inactiveColor="#000"
          activeColor="#000"
          codeInputStyle={{ fontSize: 24 }}
            onFulfill={(code) => setNumber(code)}
        />
      </View>
      <View style={styles.btnCont}>
        <TouchableOpacity onPress={verify} style={styles.btn}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Second

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 45,
    flex: 1,
  },
  txt: {
    paddingVertical: 45,
    fontSize: 16,
  },
  inpContainer: { width: "90%", alignItems: "center" },
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
