import { useSSO } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const {startSSOFlow} = useSSO()

    const handleSocialAuth = async (strategy:"oauth_google" | "oauth_github") => {
        if(loadingStrategy) return
        setLoadingStrategy(strategy)

        try {
            // const {createdSessionId, setActive} = await startSSOFlow({strategy})
            const res = await startSSOFlow({strategy})
            const {createdSessionId, setActive} = res
            console.log('loggin res:', res)
            if(!createdSessionId || !setActive) {
                Alert.alert("Sign-in incomplete", "Sign-in did not complete. Please try again.")
                return 
            }
            await setActive({session: createdSessionId})
            router.replace("/")
        } catch (error) {
            console.log("Error in social auth:", error)
            Alert.alert("Error", "Failed to sign in. Please try again.")
        } finally {
            setLoadingStrategy(null)
        }
    }

    return {
        loadingStrategy,
        handleSocialAuth
        }
    }
export default useSocialAuth