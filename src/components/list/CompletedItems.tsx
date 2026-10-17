import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const CompletedItems = () => {
    const {removeItem, togglePurchased, items} = useGroceryStore()
    const completedItems = items.filter((item) => item.purchased)
    if(!completedItems.length) return null
  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
            Completed
        </Text>
        {completedItems.map((item) => (

            <View className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">

        <View className="flex-row items-center gap-2">
            <Pressable onPress={async () => {
                await togglePurchased(item.id)
            }}
            className="h-6 w-6 items-center justify-center rounded-full bg-primary bg-green-500">
                <FontAwesome name="check" size={12} color="#ffffff"/>
            </Pressable>
            <Text className="text-base text-muted-foreground line-through">{item.name}</Text>
        </View>
        <Pressable className="h-9 w-9 items-center justify-center rounded-xl bg-[#ced4da]"
                onPress={() => removeItem(item.id)}
                >
                    <FontAwesome name="trash" size={13} color="#d4d5f58"/>
                </Pressable>
                </View>
            ))}
    </View>
  )
}

export default CompletedItems