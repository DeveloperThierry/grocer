import { useGroceryStore } from "@/store/grocery-store";
import { FlatList, Text, View } from "react-native";
const categoryColors: Record<string, string> = {
  Produce: "#463f3a",
  Dairy: "#cccccc",
  Bakery: "#a5a5a5",
  Pantry: "#7f7f7f",
  Snacks: "#595959",
};
const InsightsCategorySection = () => {
  const { items } = useGroceryStore();
  const total = items.length;

  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryEntries = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-foreground">
          {" "}
          Items by category
        </Text>
        <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
          {" "}
          {categoryEntries.length} groups
        </Text>
      </View>
      <FlatList
        data={categoryEntries}
        keyExtractor={(category) => category[0]}
        renderItem={({item: [category, count]}) => 
         { 
            const widthPercent = total ? Math.max(10, Math.round((count/total) * 100)) : 10
            return <View className="mt-3">
            <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm font-medium text-foreground">{category}</Text>
                <Text className="text-sm text-muted-foreground">{count}</Text>
            </View>
            <View className="overflow-hidden rounded-full bg-secondary">
                <View
                className="h-2 rounded-full"
                style={{
                    width:`${widthPercent}%` as `${number}%`,
                    backgroundColor:categoryColors[category] ?? "#adb5bd"
                }}
                >

                </View>
            </View>
          </View>}
       }
      />

      {categoryEntries.length === 0 ? (<View className="mt-3  rounded-2xl bg-muted px-4 py-3">
        <Text className="text-sm text-muted-foreground">
            Add items to reveal your category mix.
        </Text>
      </View>) : (null)}
    </View>
  );
};

export default InsightsCategorySection;
