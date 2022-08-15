import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  // psw init
  const [ psw, setPsw ] = useState('')
  const changePsw = (password) => {
    setPsw(password)
  }

  // 確認 input 內有文字
  const [ pswExist, setPswExist ] = useState(false)

  // btn checked status
  const [ checkStatus, setCheckStatus ] = useState(false)
  const btnChecked = () => {
    if (psw) setPswExist(true)
    if (psw === '123456') setCheckStatus(true)
    // 1.5秒後重置
    setTimeout(() => {
      setPswExist(false)
      setCheckStatus(false)
      setPsw('')
    }, 1500);
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>密碼確認 APP</Text>
      <TextInput 
        placeholder='請輸入密碼'
        style={ styles.textInput}r
        onChangeText={(val) => changePsw(val)}
        value={psw}
        maxLength={6}
      ></TextInput>

      {/* render： check result text */}
      { !pswExist
          ? <Text style={{ color: '#fff', marginTop: 10, fontSize: 20 }}></Text>
          :  checkStatus
            ? <Text style={{ color: 'red', marginTop: 10, fontSize: 20 }}>密碼正確</Text> 
            : <Text style={{ color: '#fff', marginTop: 10, fontSize: 20 }}>密碼錯誤</Text> }

      <TouchableOpacity
        style={ styles.button }
        onPress={() => btnChecked()}
      >
        <Text
          style={ styles.buttonText }
        >
          驗證
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 6,
    fontSize: 20
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  }
});
