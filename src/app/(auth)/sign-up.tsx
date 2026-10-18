import TabScreenBackground from '@/components/TabScreenBackground'
import { useAuth, useSignUp } from '@clerk/expo'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { Button, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, isSignedIn } = useAuth()
  const { signUp } = useSignUp()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress, password })
    if (error) {
      // Handle the error in your app.
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      return
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode()
    if (sendError) {
      // Handle the error in your app.
      return
    }

    setIsVerifying(true)
  }

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code })
    if (error) {
      // Handle the error in your app.
      return
    }

    const { error: finalizeError } = await signUp.finalize()
    if (finalizeError) {
      // Handle the error in your app.
    }
  }

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return (
     <Redirect href="/"/>
      // <View>
      //   <Text>You're signed in</Text>
      // </View>
    )
  }

  if (isVerifying) {
    return (
      <SafeAreaView className="flex-1 bg-background  p-4 gap-2 pt-10" >
        <Text  className="mb-10 font-bold text-2xl text-primary">
             Verification
           </Text>
           <Text  className="font-base text-xl text-primary">
             Enter code
           </Text>
        <TextInput
         
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={"gray"}
          className="text-primary"

          onChangeText={setCode}
          keyboardType="numeric"
        />
           <Pressable
                  className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border  bg-card px-4 bg-primary active:opacity-90 `} onPress={handleVerify}  disabled={!code} >
                    <Text className="text-primary-foreground">Verify</Text>
                  </Pressable>
        {/* <Button title="Resend" onPress={() => signUp.verifications.sendEmailCode()} /> */}
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background p-4 gap-2 pt-10" >
      <TabScreenBackground/>
     <Text  className="mb-10 font-bold text-2xl text-primary">
             Sign Up
           </Text>
                 <Text className="text-primary">Email Address</Text>
           
      <TextInput
       
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={"gray"}
        className="text-primary"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
            <Text className="text-primary">Password</Text>
      
      <TextInput
       
        value={password}
        placeholder="Enter password"
        placeholderTextColor={"gray"}
        className="text-primary"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      {/* <Button title="Sign up" onPress={handleSignUp} /> */}
    
             <Pressable
                  className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border  bg-card px-4 active:opacity-90 bg-primary `}
                    onPress={handleSignUp}
                    disabled={!emailAddress || !password || isVerifying}
                  >
                    <Text className="text-primary-foreground">Submit</Text>
                  </Pressable>
      {/* Required for sign-up flows on Expo web if your application uses legacy bot sign-up protection.
      Clerk skips the browser CAPTCHA on iOS and Android.
      See https://clerk.com/docs/guides/secure/legacy-bot-protection */}
      <Text className="mt-3 text-sm leading-5 text-muted-foreground">
            By continuing, you agree to our Terms and Privacy Policy
           </Text>
      <View  className="flex flex-row mt-10">
              <Text className="text-primary">Already have an account? </Text>
              <Link href="/sign-in">
                <Text className="underline text-primary">Sign In</Text>
              </Link>
            </View>
      <View nativeID="clerk-captcha" />
    </SafeAreaView>
  )
}
