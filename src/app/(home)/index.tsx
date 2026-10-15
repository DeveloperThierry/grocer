import { Show, useClerk, useUser } from "@clerk/expo";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="flex p-4 gap-4 my-10">
      <Text className="text-xl font-bold">Welcome!</Text>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable className="bg-black w-full h-12 rounded-md flex justify-center items-center p-4" onPress={() => signOut()}>
          <Text className="text-white font-bold">Sign out</Text>
        </Pressable>
      </Show>
    </SafeAreaView>
  );
}
