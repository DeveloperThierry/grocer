import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { GroceryCategory, GroceryPriority, useGroceryStore } from '@/store/grocery-store'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const categories:GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"]
const priorities:GroceryPriority[] = ["low", "medium", "high"]
const categoryIcons = {
    Produce:"leaf",
    Dairy:"cow",
    Bakery:"bread-slice",
    Pantry:"box-open",
    Snacks:"cookie-bite",

}
const PlannerFormCard = () => {
    const {error, addItem} = useGroceryStore()
    const [name, setName] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("1")
    const [category, setCategory] = useState<GroceryCategory>("Produce")
    const [priority, setPriority] = useState<GroceryPriority>("low")

    const canCreate = name.trim().length > 0
    const handleQuantityChange = (value:string) => {
        setQuantity(value.replace(/[^0-9]/g, ""))
    }
    const createItem = async () => {
        await addItem({
            name:name.trim(),
            category,
            priority,
            quantity: Number(quantity)
        })

        Alert.alert("Success", "Item created")

        // reset form
        setName("" )
        setQuantity("1")
        setCategory("Produce")
        setPriority("low")
    }
  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      {/* NAME */}
      <Text className="text-sm font-semibold text-foreground">Name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="bag-shopping" size={13} color="#adb5bd"/>
        <TextInput value={name} placeholder="Ex. Whiteberries" placeholderTextColor="#8aa397" onChangeText={setName} className="ml-3 flex-1 text-base text-foreground"/>
      </View>

       {/* Quantity */}
      <Text className="text-sm font-semibold text-foreground">Quantity</Text>
       <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="hashtag" size={13} color="#adb5bd"/>
        <TextInput value={quantity} placeholder="1" placeholderTextColor="#adb5bd" onChangeText={handleQuantityChange} keyboardType="number-pad" className="ml-3 flex-1 text-base text-foreground"/>
      </View>

      {/* CATEGORIES */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
            const active = option === category
            return(
                <Pressable
                key={option}
                onPress={() => setCategory(option)}
                className={`flex-row items-center rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-secondary"}`}
                >
                    <FontAwesome6 name={categoryIcons[option]} size={12} color={active ? "#fff" : "#adb5bd"}/>
                    <Text className={`ml-2 text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}>{option}</Text>
                </Pressable>
            )
        })}
      </View>

      {/* PRIORITIES */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Priority
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {priorities.map((option) => {
            const active = option === priority
            const icon = option === "high" ? "bolt" : option === "medium" ? "compass" : "seedling"
            return(
                <Pressable
                key={option}
                onPress={() => setPriority(option)}
                className={`flex-row items-center rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-secondary"}`}
                >
                    <FontAwesome6 name={icon} size={12} color={active ? "#fff" : "#adb5bd"}/>
                    <Text className={`ml-2 text-sm font-semibold capitalize ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}>{option}</Text>
                </Pressable>
            )
        })}
      </View>

      <Pressable
      className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${canCreate ? "bg-primary":"bg-muted"}`}
      onPress={createItem}
      disabled={!canCreate}
      >
        <FontAwesome6 name="plus" size={14} color={canCreate ? "#fff" : "#adb5bd"}/>
        <Text className={`ml-2 text-base font-semibold ${canCreate ? "text-primary-foreground" : "text-muted-foreground"}`}>Add to Grocery List</Text>

      </Pressable>

      {error ? (<View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
        <Text className="text-sm text-destructive-foreground text-white text-center uppercase">{error}</Text>
      </View>) : null}
    </View>
  )
}

export default PlannerFormCard