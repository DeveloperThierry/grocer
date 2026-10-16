import { useAuth, useSignUp } from '@clerk/expo'
import { Link } from 'expo-router'
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
      <View>
        <Text>You're signed in</Text>
      </View>
    )
  }

  if (isVerifying) {
    return (
      <SafeAreaView className="flex-1 bg-primary mt-12 p-4 gap-2 pt-10" >
        <Text  className="mb-10 font-bold text-2xl">
             Verification
           </Text>
        <TextInput
         
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerify}  disabled={!code} />
        {/* <Button title="Resend" onPress={() => signUp.verifications.sendEmailCode()} /> */}
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-primary my-10 p-4 gap-2 pt-10">
     <Text  className="mb-10 font-bold text-2xl">
             Sign Up
           </Text>
                 <Text >Email Address</Text>
           
      <TextInput
       
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
            <Text >Password</Text>
      
      <TextInput
       
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      {/* <Button title="Sign up" onPress={handleSignUp} /> */}
    
             <Pressable
                  className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90`}
                    onPress={handleSignUp}
                    disabled={!emailAddress || !password || isVerifying}
                  >
                    <Text className="text-white">Submit</Text>
                  </Pressable>
      {/* Required for sign-up flows on Expo web if your application uses legacy bot sign-up protection.
      Clerk skips the browser CAPTCHA on iOS and Android.
      See https://clerk.com/docs/guides/secure/legacy-bot-protection */}
      <Text className="mt-3 text-sm leading-5 text-muted-foreground">
            By continuing, you agree to our Terms and Privacy Policy
           </Text>
      <View  className="flex flex-row mt-10">
              <Text>Already have an account? </Text>
              <Link href="/sign-in">
                <Text className="underline">Sign In</Text>
              </Link>
            </View>
      <View nativeID="clerk-captcha" />
    </SafeAreaView>
  )
}
