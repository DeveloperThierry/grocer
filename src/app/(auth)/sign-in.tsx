import TabScreenBackground from "@/components/TabScreenBackground";
import useSocialAuth from "@/hooks/useSocialAuth";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGitHubClicked = loadingStrategy === "oauth_github";
  const isLoading = isGoogleClicked || isGitHubClicked;
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/device-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code"
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    const { error } = await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
      console.error("Sign-in attempt not complete:", error);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <SafeAreaView className="flex-1 bg-background p-4 gap-2 pt-10">
        <Text className="mb-10 font-bold text-2xl text-primary">
          Verify your account
        </Text>
        <Text className="font-base text-xl text-primary">Enter Code</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          className="text-primary"
          placeholderTextColor="gray"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <Text className="text-red-400">{errors.fields.code.message}</Text>
        )}
        <Pressable
          className="mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 bg-primary"
          onPress={handleVerify}
          disabled={fetchStatus === "fetching"}
        >
          <Text className="ml-3 flex-1 text-lg font-semibold text-primary-foreground ">
            Verify
          </Text>
        </Pressable>
        <View className="flex flex-row justify-between">
          <Pressable
            className="mb-3 h-14 flex-1 flex-row items-center rounded-2xl border-none bg-card px-4 active:opacity-90 bg-gray-300  "
            onPress={() => signIn.mfa.sendEmailCode()}
          >
            <Text className="ml-3 text-lg font-semibold  text-center text-card-foreground">
              I need a new code
            </Text>
          </Pressable>
          <Pressable
            className="mb-3 h-14 flex-2 flex-row items-center  rounded-2xl border-none bg-red-500 bg-card px-4 active:opacity-90"
            onPress={() => signIn.reset()}
          >
            <Text className="ml-1 text-lg font-semibold  text-primary text-card-foreground">
              Start over
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      className="flex-1 bg-background p-4 gap-2 pt-10"
      edges={["top"]}
    >
      <TabScreenBackground />
      <Text className="mb-10 font-bold text-2xl text-primary">Sign In</Text>

      <Text className="text-foreground">Email address</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        className="text-primary"
        placeholderTextColor={`gray`}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        keyboardType="email-address"
      />
      {errors.fields.identifier && (
        <Text className="text-red-400">{errors.fields.identifier.message}</Text>
      )}
      <Text className="text-foreground">Password</Text>
      <TextInput
        value={password}
        placeholder="Enter password"
        className="text-primary"
        placeholderTextColor={`gray`}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors.fields.password && (
        <Text className="text-red-400">{errors.fields.password.message}</Text>
      )}
      <Pressable
        className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 bg-primary ${
          isLoading ? "opacity-70" : ""
        }`}
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        <Text className="text-primary-foreground">Login</Text>
      </Pressable>
      <View className="mt-6">
        <Pressable
          className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
            isLoading ? "opacity-70" : ""
          }`}
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
        >
          <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
            <Image
              source={require("../../../assets/images/google.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
            {isGoogleClicked ? "Connecting Google..." : "Continue with Google"}
          </Text>
        </Pressable>
        <Pressable
          className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
            isLoading ? "opacity-70" : ""
          }`}
          onPress={() => handleSocialAuth("oauth_github")}
          disabled={isLoading}
        >
          <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
            <Image
              source={require("../../../assets/images/github.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
            {isGitHubClicked ? "Connecting Github..." : "Continue with Github"}
          </Text>
        </Pressable>
      </View>
      <View>
        <Text className="mt-3  text-sm leading-5 text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
      <View className="flex flex-row mt-10 ">
        <Text className="text-secondary-foreground">
          Don't have an account?{" "}
        </Text>
        <Link href="/sign-up">
          <Text className="underline text-secondary-foreground">Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
  // return (
  //   <SafeAreaView className="flex-1 bg-primary light:bg-primary p-4 gap-2 pt-10 " edges={["top"]}>
  //     {/* <TabScreenBackground/> */}
  //     <Text className="mb-10 font-bold text-2xl ">
  //       Sign In
  //     </Text>

  //     <Text >Email address</Text>
  //     <TextInput

  //       autoCapitalize="none"
  //       value={emailAddress}
  //       placeholder="Enter email"
  //       onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
  //       keyboardType="email-address"
  //     />
  //     {errors.fields.identifier && (
  //       <Text >{errors.fields.identifier.message}</Text>
  //     )}
  //     <Text >Password</Text>
  //     <TextInput
  //       value={password}
  //       placeholder="Enter password"
  //       secureTextEntry={true}
  //       onChangeText={(password) => setPassword(password)}
  //     />
  //     {errors.fields.password && (
  //       <Text >{errors.fields.password.message}</Text>
  //     )}
  //     <Pressable
  //      className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70":""}`}
  //       onPress={handleSubmit}
  //       disabled={!emailAddress || !password || fetchStatus === 'fetching'}
  //     >
  //       <Text className="text-white">Login</Text>
  //     </Pressable>
  //    <View className="mt-6">
  //      <Pressable className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70":""}`} onPress={() => handleSocialAuth("oauth_google")} disabled={isLoading}>
  //       <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
  //         <Image
  //           source={require("../../../assets/images/google.png")}
  //           style={{ width: 20, height: 20 }}
  //         />
  //       </View>
  //             <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">{isGoogleClicked ? "Connecting Google...":"Continue with Google"}</Text>
  //           </Pressable>
  //           <Pressable className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70":""}`} onPress={() => handleSocialAuth("oauth_github")} disabled={isLoading}>
  //       <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
  //         <Image
  //           source={require("../../../assets/images/github.png")}
  //           style={{ width: 20, height: 20 }}
  //         />
  //       </View>
  //             <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">{isGitHubClicked ? "Connecting Github...":"Continue with Github"}</Text>
  //           </Pressable>
  //    </View>
  //    <View>
  //    <Text className="mt-3  text-sm leading-5 text-muted-foreground">
  //     By continuing, you agree to our Terms and Privacy Policy
  //    </Text>
  //    </View>
  //     <View  className="flex flex-row mt-10">
  //       <Text>Don't have an account? </Text>
  //       <Link href="/sign-up">
  //         <Text className="underline">Sign up</Text>
  //       </Link>
  //     </View>
  //   </SafeAreaView>
  // )
}
