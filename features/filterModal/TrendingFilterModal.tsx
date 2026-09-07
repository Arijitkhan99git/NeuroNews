import { VStack } from "@/components/ui/vstack";
import clsx from "clsx";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useTrendingFilterStore } from "./filterStore/useTrendingFilterStore";

const SafeAreaView = styled(RNSafeAreaView);

interface TrendingFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const TrendingFilterModal = ({ visible, onClose }: TrendingFilterModalProps) => {
  const trendingNews = useTrendingFilterStore((s) => s.trendingNews);

  const storedSelectedCategories = useTrendingFilterStore(
    (s) => s.selectedCategories,
  );
  const setSelectedCategories = useTrendingFilterStore(
    (s) => s.setSelectedCategories,
  );
  const clearCategories = useTrendingFilterStore((s) => s.clearCategories);

  // Local draft — not committed to the store until "Apply"
  const [draftCategories, setDraftCategories] = useState<string[]>(
    storedSelectedCategories,
  );

  // Re-sync the draft with the store's actual applied value every time the modal opens
  useEffect(() => {
    if (visible) {
      setDraftCategories(storedSelectedCategories);
    }
  }, [visible, storedSelectedCategories]);

  const toggleDraftCategory = (category: string) => {
    setDraftCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const totalSelectedCount = draftCategories.length;

  const handleClearAll = () => {
    clearCategories();
    setDraftCategories([]);
  };

  const handleApply = () => {
    setSelectedCategories(draftCategories);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const categoryList = [
    ...new Set((trendingNews || []).map((item) => item.category.trim())),
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView className="flex-1">
        <BlurView intensity={50} tint="dark" style={{ flex: 1 }}>
          <Pressable
            className="modal-overlay"
            onPress={handleClose}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Pressable
              className="modal-container"
              onPress={(e) => e.stopPropagation()}
            >
              <View className="modal-header">
                <Text className="modal-title">Filter Trends</Text>
                <Pressable className="modal-close" onPress={handleClose}>
                  <Text className="modal-close-text">x</Text>
                </Pressable>
              </View>

              {/* Filter Options */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                <VStack className="modal-body">
                  <VStack className="gap-3">
                    <Text className="text-lg text-secondary-foreground">
                      Select Category
                    </Text>

                    <View className="category-scroll">
                      {categoryList.map((cat, index) => {
                        const isActive = draftCategories.includes(cat);
                        return (
                          <Pressable
                            key={index}
                            className={clsx(
                              "category-chip",
                              isActive && "category-chip-active",
                            )}
                            onPress={() => toggleDraftCategory(cat)}
                          >
                            <Text
                              className={clsx(
                                "category-chip-text",
                                isActive && "category-chip-text-active",
                              )}
                              style={{ fontSize: 13 }}
                            >
                              {cat}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </VStack>
                </VStack>
              </ScrollView>

              {/* Footer actions */}
              <View className="modal-footer">
                <Pressable
                  className="filter-clear-btn"
                  onPress={handleClearAll}
                >
                  <Text className="filter-clear-text">Clear all</Text>
                </Pressable>

                <Pressable className="filter-apply-btn" onPress={handleApply}>
                  <Text className="filter-apply-text">
                    Apply
                    {totalSelectedCount > 0 ? ` (${totalSelectedCount})` : ""}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
};

export default TrendingFilterModal;
