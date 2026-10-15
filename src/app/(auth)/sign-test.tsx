import { useAuth, useClerk, useSignUp } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native'

export default function MainScreen() {
  const { isSignedIn } = useAuth();
  const {openSignIn, openSignUp} = useClerk()
  const router = useRouter();
  const { signUp } = useSignUp()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(home)");
    }
  }, [isSignedIn]);
  
  return (
    <View style={styles.container}>
      <Text className="text-4xl text-center font-extrabold">Grocer</Text>
      <TouchableOpacity className="bg-black w-full h-12 rounded-md flex justify-center items-center p-4" onPress={() => openSignIn({})} >
        <Text className="text-white font-bold">
        Sign In With Clerk
        </Text>
      </TouchableOpacity>
      {/* <Button title="Sign In With Clerk" onPress={() => openSignIn({})} /> */}
      {/* Required for sign-up flows on Expo web if your application uses legacy bot sign-up protection.
      Clerk skips the browser CAPTCHA on iOS and Android.
      See https://clerk.com/docs/guides/secure/legacy-bot-protection */}
      <View nativeID="clerk-captcha" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
})