import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native'

import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Ionicons } from '@expo/vector-icons'

import Logo from '../assets/img/logo.png'
import apple from '../assets/img/apple-logo.png'
import google from '../assets/img/google.png'


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+/


const Signin = () => {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)
  const [submitting,setSubmitting] = useState(false)
  const [focusedField,setFocusedField] = useState(null)


  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })


  if(!fontsLoaded){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large"
          color="#1B4F8C"
        />
      </View>
    )
  }



  const handleSignin = () => {

    if(!email.trim() || !EMAIL_REGEX.test(email.trim())){
      return Alert.alert(
        "Invalid Email",
        "Please enter a valid email address"
      )
    }


    if(!password.trim()){
      return Alert.alert(
        "Password Required",
        "Please enter your password"
      )
    }


    setSubmitting(true)


    // Replace with your API login
    setTimeout(()=>{

      setSubmitting(false)

      router.push('/home')

    },500)

  }



  const inputStyle = (field)=>[
    styles.inputWrapper,
    focusedField === field && styles.inputWrapperFocused
  ]



return (

<KeyboardAvoidingView

style={{
flex:1,
backgroundColor:'#F5F7FA'
}}

behavior={
Platform.OS === 'ios'
?'padding'
:undefined
}

>


<ScrollView

contentContainerStyle={styles.container}

keyboardShouldPersistTaps="handled"

>


<View style={styles.header}>

<Image
source={Logo}
style={styles.img}
/>


<Text style={styles.title}>
Welcome Back 👋
</Text>


<Text style={styles.subtitle}>
Sign in to continue
</Text>


</View>




<View style={styles.card}>


<Text style={styles.label}>
Email
</Text>


<View style={inputStyle('email')}>

<Ionicons
name="mail-outline"
size={18}
color="#8A93A3"
style={styles.inputIcon}
/>


<TextInput

style={styles.input}

placeholder="you@example.com"

placeholderTextColor="#A9B0BC"

keyboardType="email-address"

autoCapitalize="none"

autoCorrect={false}

value={email}

onChangeText={setEmail}

onFocus={()=>setFocusedField('email')}

onBlur={()=>setFocusedField(null)}

/>


</View>





<Text style={styles.label}>
Password
</Text>


<View style={inputStyle('password')}>

<Ionicons
name="lock-closed-outline"
size={18}
color="#8A93A3"
style={styles.inputIcon}
/>



<TextInput

style={styles.input}

placeholder="••••••••"

placeholderTextColor="#A9B0BC"

secureTextEntry={!showPassword}

value={password}

onChangeText={setPassword}

onFocus={()=>setFocusedField('password')}

onBlur={()=>setFocusedField(null)}

/>



<TouchableOpacity

onPress={()=>setShowPassword(!showPassword)}

>

<Ionicons

name={
showPassword
?'eye-off-outline'
:'eye-outline'
}

size={18}

color="#8A93A3"

/>

</TouchableOpacity>


</View>





<TouchableOpacity

style={styles.forgot}

onPress={()=>router.push('/forgot-password')}

>

<Text style={styles.forgotText}>
Forgot Password?
</Text>


</TouchableOpacity>





<TouchableOpacity

style={[
styles.btn,
submitting && styles.btnDisabled
]}

onPress={handleSignin}

disabled={submitting}

>


{
submitting ?

<ActivityIndicator
size="small"
color="#fff"
/>

:

<Text style={styles.btnText}>
Sign In
</Text>

}


</TouchableOpacity>



</View>





<View style={styles.signinRow}>

<Text style={styles.signinText}>
Don't have an account?
</Text>


<TouchableOpacity

onPress={()=>router.push('/signup')}

>

<Text style={styles.signinLink}>
Sign Up
</Text>

</TouchableOpacity>


</View>




<View style={styles.otherOption}>

<Text style={styles.option}>
- Or sign in with -
</Text>

</View>





<View style={styles.btnsignUp}>


<View style={styles.google}>

<Image
source={google}
style={styles.googleImg}
/>


<Text style={styles.txt}>
Sign in with Google
</Text>


</View>




<View style={styles.google}>


<Image
source={apple}
style={styles.googleImg}
/>


<Text style={styles.txt}>
Sign in with Apple
</Text>


</View>



</View>


</ScrollView>

</KeyboardAvoidingView>

)

}


export default Signin



const styles = StyleSheet.create({

loadingContainer:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#F5F7FA'
},


container:{
flexGrow:1,
paddingHorizontal:20,
paddingTop:56,
paddingBottom:40
},


header:{
alignItems:'center',
marginBottom:28
},


img:{
width:84,
height:84,
resizeMode:'contain',
marginBottom:14,
},


title:{
fontFamily:'Roboto_700Bold',
fontSize:24,
color:'#1A2433',
textAlign:'left',
},


subtitle:{
fontFamily:'Roboto_400Regular',
fontSize:14,
color:'#8A93A3',
marginTop:4
},



card:{
backgroundColor:'#fff',
borderRadius:16,
padding:22,

shadowColor:'#1A2433',
shadowOffset:{
width:0,
height:4
},

shadowOpacity:0.06,
shadowRadius:12,

elevation:2
},



label:{
fontFamily:'Roboto_500Medium',
fontSize:13,
color:'#3D4757',
marginBottom:8,
marginTop:14
},



inputWrapper:{
flexDirection:'row',
alignItems:'center',

borderWidth:1.5,

borderColor:'#E4E8EE',

borderRadius:10,

paddingHorizontal:14,

backgroundColor:'#FAFBFC'
},


inputWrapperFocused:{
borderColor:'#1B4F8C',
backgroundColor:'#fff'
},


inputIcon:{
marginRight:10
},



input:{
flex:1,
paddingVertical:13,
fontFamily:'Roboto_400Regular',
fontSize:15,
color:'#1A2433'
},



forgot:{
alignSelf:'flex-end',
marginTop:10
},


forgotText:{
fontFamily:'Roboto_500Medium',
fontSize:13,
color:'#1B4F8C'
},



btn:{
backgroundColor:'#1B4F8C',
paddingVertical:15,
borderRadius:10,
alignItems:'center',
marginTop:26
},


btnDisabled:{
opacity:.7
},


btnText:{
fontFamily:'Roboto_700Bold',
color:'#fff',
fontSize:15
},



signinRow:{
flexDirection:'row',
justifyContent:'center',
marginTop:22
},


signinText:{
fontFamily:'Roboto_400Regular',
color:'#8A93A3',
fontSize:14
},


signinLink:{
fontFamily:'Roboto_700Bold',
color:'#1B4F8C',
fontSize:14,
marginLeft:5
},



otherOption:{
marginTop:15
},


option:{
fontFamily:'Roboto_400Regular',
color:'#8A93A3',
fontSize:18,
textAlign:'center'
},



btnsignUp:{
flexDirection:'row',
justifyContent:'center',
marginTop:10,
gap:10
},



google:{
width:174,
height:80,
alignItems:'center',
justifyContent:'center',
borderRadius:8,
backgroundColor:'#fff',

shadowColor:'#1A2433',
shadowOffset:{
width:0,
height:6
},

shadowOpacity:.10,
elevation:4
},


googleImg:{
width:42,
height:42,
resizeMode:'contain'
},



txt:{
fontSize:11,
marginTop:8,
color:'#797c92ee'
}

})