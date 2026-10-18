import { View, Text } from 'react-native'
import React from 'react'
import { useGroceryStore } from '@/store/grocery-store'

const InsightsPrioritySection = () => {
    const {items} = useGroceryStore()
    const highPriority = items.filter((item) => item.priority === "high" && !item.purchased).length
    const highPriorityTone = highPriority === 0 ? "Everything critical is covered." : "Handle these first for a smoother trip."
  return (
    <View className="rounded-3xl border border-border bg-card p-4">
        <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-foreground">High priority remaining</Text>
            <View className={`rounded-full px-3 py-1 ${highPriority ? "bg-priority-high" : "bg-priority-low"}`}>
                <Text className={`text-xs font-bold uppercase ${highPriority ? "text-priority-high-foreground" : "text-priority-low-foreground"}`}>
                    {highPriority ? "Active" : "Clear"}
                </Text>
            </View>
        </View>
      <View>
        <Text className="mt-1 text-3xl font-extrabold text-foreground">{highPriority}</Text>
        <Text className="mt-1 text-sm text-muted-foreground">{highPriorityTone}</Text>
      </View>
    </View>
  )
}

export default InsightsPrioritySection