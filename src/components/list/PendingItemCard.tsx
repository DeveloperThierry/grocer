import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { GroceryItem, useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const priorityPillBg = {
    low: "bg-priority-low",
    medium: "bg-priority-medium",
    high: "bg-priority-high",
}

const priorityPillText = {
    low:"text-priority-low-foreground",
    medium:"text-priority-medium-foreground",
    high:"text-priority-high-foreground",
}

const PendingItemCard = ({item}:{item:GroceryItem}) => {
    const {removeItem, updateQuantity, togglePurchased} = useGroceryStore()
  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        <Pressable className="mt-1 size-6 items-center justify-center rounded-full border-2 border-border bg-card"
        onPress={() => togglePurchased(item.id)}
        ></Pressable>
        <View className="flex-1">
            <View className="flex-row items-center justify-between gap-2">
                <Text className="flex-1 text-lg font-semibold text-card-foreground">{item.name}</Text>
                <View className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}>
                    <Text className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}>
                        {item.priority}
                    </Text>
                </View>
            </View>
            <View className="mt-2 flex-row items-center gap-2">
                <View className="rounded-full bg-secondary px-3 py-1">
                    <Text className="text-xs font-semibold text-secondary-foreground">
                        {item.category}
                    </Text>
                </View>
            </View>
            <View className="mt-3 flex-row items-center gap-2">
                <Pressable className="h-8 w-8 items-center justify-center rounded-xl border border-input bg-muted"
                onPress={() => updateQuantity(item.id, Math.max(1, item.quantity-1))}
                >
                    <FontAwesome name="minus" size={12} color="#adb5bd"/>
                </Pressable>

                <Text className='min-w-9 text-center text-base font-semibold text-foreground'>
                    {item.quantity}
                </Text>

                <Pressable className="h-8 w-8 items-center justify-center rounded-xl border border-input bg-muted"
                onPress={() => updateQuantity(item.id, Math.max(1, item.quantity+1))}
                >
                    <FontAwesome name="plus" size={12} color="#adb5bd"/>
                </Pressable>

            </View>
        </View>

        <Pressable className="h-9 w-9 items-center justify-center rounded-xl bg-[#ced4da]"
                onPress={ () => removeItem(item.id)}
                >
                    <FontAwesome name="trash" size={13} />
                </Pressable>

      </View>
    </View>
  )
}

export default PendingItemCard