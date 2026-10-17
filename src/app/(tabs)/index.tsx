import { Show, useClerk, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4 mt-10" edges={['top']}>
      <Text className="text-xl font-bold">Welcome!</Text>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable className="bg-red-500 w-full h-12 rounded-md flex justify-center items-center p-4" onPress={() => signOut()}>
          <Text className="text-white font-bold">Sign out</Text>
        </Pressable>
       
      </Show>
    </SafeAreaView>
  );
}
