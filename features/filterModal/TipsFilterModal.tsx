import { VStack } from "@/components/ui/vstack";
import { useAiTipsFilterStore } from "@/features/filterModal/filterStore/useAiTipsFilterStore";
import clsx from "clsx";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

interface TipsFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const TipsFilterModal = ({ visible, onClose }: TipsFilterModalProps) => {
  const tips = useAiTipsFilterStore((s) => s.tips);

  const storedSelectedCategories = useAiTipsFilterStore((s) => s.selectedCategories);
  const setSelectedCategories = useAiTipsFilterStore((s) => s.setSelectedCategories);

  const storedSelectedDifficulties = useAiTipsFilterStore((s) => s.selectedDifficulties);
  const setSelectedDifficulties = useAiTipsFilterStore((s) => s.setSelectedDifficulties);

  const clearCategories = useAiTipsFilterStore((s) => s.clearCategories);
  const clearDifficulties = useAiTipsFilterStore((s) => s.clearDifficulties);

  // Local draft — not committed to the store until "Apply"
  const [draftCategories, setDraftCategories] = useState<string[]>(storedSelectedCategories);
  const [draftDifficulties, setDraftDifficulties] = useState<string[]>(storedSelectedDifficulties);

  // Re-sync the draft with the store every time the modal opens
  useEffect(() => {
    if (visible) {
      setDraftCategories(storedSelectedCategories);
      setDraftDifficulties(storedSelectedDifficulties);
    }
  }, [visible, storedSelectedCategories, storedSelectedDifficulties]);

  const toggleDraftCategory = (category: string) => {
    setDraftCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const toggleDraftDifficulty = (difficulty: string) => {
    setDraftDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    );
  };

  const totalSelectedCount =
    (draftCategories.length > 0 ? draftCategories.length : 0) +
    (draftDifficulties.length > 0 ? draftDifficulties.length : 0);

  const handleClearAll = () => {
    clearCategories();
    clearDifficulties();
    setDraftCategories([]);
    setDraftDifficulties([]);
  };

  const handleApply = () => {
    setSelectedCategories(draftCategories);
    setSelectedDifficulties(draftDifficulties);
    onClose();
  };

  const categoryList = [...new Set((tips || []).map((item) => item.category.trim()))];
  const difficultyList = [...new Set((tips || []).map((item) => item.difficulty.trim()))];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <BlurView intensity={50} tint="dark" style={{ flex: 1 }}>
          <Pressable
            className="modal-overlay"
            onPress={onClose}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Pressable
              className="modal-container"
              onPress={(e) => e.stopPropagation()}
            >
              <View className="modal-header">
                <Text className="modal-title">Filter Tips</Text>
                <Pressable className="modal-close" onPress={onClose}>
                  <Text className="modal-close-text">x</Text>
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {/* Category */}
                <VStack className="modal-body">
                  <VStack className="gap-3">
                    <Text className="text-lg text-secondary-foreground">Select Category</Text>
                    <View className="category-scroll">
                      {categoryList.map((cat, index) => {
                        const isActive = draftCategories.includes(cat);
                        return (
                          <Pressable
                            key={index}
                            className={clsx("category-chip", isActive && "category-chip-active")}
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

                {/* Difficulty */}
                <VStack className="modal-body">
                  <VStack className="gap-3">
                    <Text className="text-lg text-secondary-foreground">Select Difficulty</Text>
                    <View className="category-scroll">
                      {difficultyList.map((diff, index) => {
                        const isActive = draftDifficulties.includes(diff);
                        return (
                          <Pressable
                            key={index}
                            className={clsx("category-chip", isActive && "category-chip-active")}
                            onPress={() => toggleDraftDifficulty(diff)}
                          >
                            <Text
                              className={clsx(
                                "category-chip-text",
                                isActive && "category-chip-text-active",
                              )}
                              style={{ fontSize: 13 }}
                            >
                              {diff}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </VStack>
                </VStack>
              </ScrollView>

              {/* Footer */}
              <View className="modal-footer">
                <Pressable className="filter-clear-btn" onPress={handleClearAll}>
                  <Text className="filter-clear-text">Clear all</Text>
                </Pressable>
                <Pressable className="filter-apply-btn" onPress={handleApply}>
                  <Text className="filter-apply-text">
                    Apply{totalSelectedCount > 0 ? ` (${totalSelectedCount})` : ""}
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

export default TipsFilterModal;
