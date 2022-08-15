import React, { useState, useRef, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  // psw init
  const [ psw, setPsw ] = useState('')
  const changePsw = (password) => {
    setPsw(password)
  }

  // check number 隨機生成四位數
  const randomGenerate =(min, max) => { // 四位數生成函式
    const num = Math.floor(Math.random() * (max - min)) + min
    const newNum = Math.floor(Math.random() * (max - min)) + min
    if (String(num).length === 4) return num // 避免出現少於四位數，暫時無解法
    else return newNum
  }
  const [checkNum, setCheckNm] = useState(randomGenerate(0,9999))


  // 倒數計時
  let [countdown, setCountdown] = useState(30)
  let intervalRef = useRef()
  const decreaseCountdown = () => setCountdown((prev) => prev - 1)

  useEffect(() => {
    intervalRef.current = setInterval(decreaseCountdown, 1000)
    return () => clearInterval(intervalRef.current);
  }, []);
  
  if (countdown < 0) {
    setCountdown(30)
    setCheckNm(randomGenerate(0,9999))
  }


  // 確認 input 內有文字
  const [ pswExist, setPswExist ] = useState(false)

  // btn checked status
  const [ checkStatus, setCheckStatus ] = useState(false)
  
  const btnChecked = () => {
    if (psw) setPswExist(true)
    if (Number(psw) === checkNum) setCheckStatus(true)

    // 1.5秒後重置
    setTimeout(() => {
      setPswExist(false)
      setCheckStatus(false)
      setPsw('')
    }, 1500);
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'grey' }}>{ countdown }s</Text>
      <Text style={{ color: '#fff', fontSize: 30, marginBottom: 50, fontWeight: 'bold' }}>{ checkNum }</Text>
      <TextInput 
        placeholder='請輸入密碼'
        style={ styles.textInput}r
        onChangeText={(val) => changePsw(val)}
        value={psw}
        maxLength={4}
        secureTextEntry={true}
      ></TextInput>

      {/* render： check result text */}
      { !pswExist
          ? <Text style={{ color: '#fff', marginTop: 10, fontSize: 20 }}></Text>
          : checkStatus
            ? <Text style={{ color: 'green', marginTop: 10, fontSize: 20 }}>密碼正確</Text> 
            : <Text style={{ color: 'red', marginTop: 10, fontSize: 20 }}>密碼錯誤</Text> }

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
