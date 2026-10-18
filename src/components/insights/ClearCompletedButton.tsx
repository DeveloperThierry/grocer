import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useGroceryStore } from '@/store/grocery-store'

const ClearCompletedButton = () => {
    const {clearPurchased} = useGroceryStore()
  return (
    <Pressable className="rounded-2xl bg-primary py-3" onPress={clearPurchased}>
        <Text className="text-center text-base font-semibold text-primary-foreground">
            Clear completed items
        </Text>
    </Pressable>
  )
}

export default ClearCompletedButton