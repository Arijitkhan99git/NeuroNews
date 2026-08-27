import { Skeleton } from "@/components/ui/skeleton";
import { Dimensions, View } from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.75;

const ArticleCardSkeleton = () => {
  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mr-5 rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden p-4"
    >
      <View className="gap-2">
        {/* Category */}
        <Skeleton variant="rounded" className="h-6 w-24 bg-gray-700" />

        {/* Title - 2 lines */}
        <View className="gap-2 mt-1 mb-2">
          <Skeleton variant="rounded" className="h-5 w-full bg-gray-700" />
          <Skeleton variant="rounded" className="h-5 w-4/5 bg-gray-700" />
        </View>

        {/* Bottom row */}
        <View className="flex-row items-center justify-between mt-1">
          {/* Source */}
          <Skeleton variant="rounded" className="h-4 w-24 bg-gray-700" />

          {/* Impact */}
          <Skeleton variant="rounded" className="h-6 w-20 bg-gray-700" />
        </View>
      </View>
    </View>
  );
};

export default ArticleCardSkeleton;
