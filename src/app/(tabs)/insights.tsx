import TabScreenBackground from "@/components/TabScreenBackground";
import ClearCompletedButton from "@/components/insights/ClearCompletedButton";
import InsightsCategorySection from "@/components/insights/InsightsCategorySection";
import InsightsPrioritySection from "@/components/insights/InsightsPrioritySection";
import InsightsStatsSection from "@/components/insights/InsightsStatsSection";
import UserProfile from "@/components/insights/UserProfile";
import { SafeAreaView, ScrollView } from "react-native";

const InsightsScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-background py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />
        <UserProfile />
        <InsightsStatsSection/>
        <InsightsCategorySection/>
        <InsightsPrioritySection/>
        <ClearCompletedButton/>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
