import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
// import { NativeTabs } from 'expo-router/native-tabs';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useEffect } from "react";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const {loadItems, items} = useGroceryStore()

  useEffect(() => {
    loadItems()
  }, [])

  // console.log("ITEMS: ", items)
  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"}/>
  }

  return   <NativeTabs tintColor="gray">
  <NativeTabs.Trigger name="index">
    <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
    <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
  </NativeTabs.Trigger>
  <NativeTabs.Trigger name="planner">
    <NativeTabs.Trigger.Icon sf="plus.circle" md="add" />
    <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
  </NativeTabs.Trigger>
  <NativeTabs.Trigger name="insights">
    <NativeTabs.Trigger.Icon sf="chart.bar" md="analytics" />
    <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
  </NativeTabs.Trigger>
</NativeTabs>;
}