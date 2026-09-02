import { VStack } from "@/components/ui/vstack";
import clsx from "clsx";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useTechNewsFilterStore } from "./filterStore/useTechNewsFilterStore";

const SafeAreaView = styled(RNSafeAreaView);

interface FilterNewsModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewsFilterModal = ({ visible, onClose }: FilterNewsModalProps) => {
  const techNews = useTechNewsFilterStore((s) => s.techNews);

  const storedSelectedCategories = useTechNewsFilterStore(
    (s) => s.selectedCategories,
  );
  const setSelectedCategories = useTechNewsFilterStore(
    (s) => s.setSelectedCategories,
  );

  const storedSelectedDifficulties = useTechNewsFilterStore(
    (s) => s.selectedDifficulties,
  );
  const setSelectedDifficulties = useTechNewsFilterStore(
    (s) => s.setSelectedDifficulties,
  );

  const clearDifficulties = useTechNewsFilterStore((s) => s.clearDifficulties);

  // Local draft — not committed to the store until "Apply"
  const [draftCategories, setDraftCategories] = useState<string[]>(
    storedSelectedCategories,
  );

  // Local difficulties draft — not committed to the store until "Apply"
  const [draftDifficulties, setDraftDifficulties] = useState<string[]>(
    storedSelectedDifficulties,
  );

  // Re-sync the draft with the store's actual applied value every time the modal opens,
  // so re-opening reflects what's currently filtered, discarding any prior unapplied edits.
  useEffect(() => {
    if (visible) {
      setDraftCategories(storedSelectedCategories);
      setDraftDifficulties(storedSelectedDifficulties);
    }
  }, [visible, storedSelectedCategories, storedSelectedDifficulties]);

  const toggleDraftCategory = (category: string) => {
    setDraftCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleDraftDifficulties = (difficulty: string) => {
    setDraftDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((c) => c !== difficulty)
        : [...prev, difficulty],
    );
  };

  const handleClearAll = () => {
    setDraftCategories([]);
    clearDifficulties();
  };

  const handleApply = () => {
    setSelectedCategories(draftCategories);
    setSelectedDifficulties(draftDifficulties);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const categoryList = [
    ...new Set((techNews || []).map((item) => item.category.trim())),
  ];

  const difficultyList = [
    ...new Set((techNews || []).map((item) => item.impact.trim())),
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
                <Text className="modal-title">Filter News</Text>
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

                <VStack className="modal-body">
                  <VStack className="gap-3">
                    <Text className="text-lg text-secondary-foreground">
                      Select Difficulty Level
                    </Text>

                    <View className="category-scroll">
                      {difficultyList.map((diff, index) => {
                        const isActive = draftDifficulties.includes(diff);
                        return (
                          <Pressable
                            key={index}
                            className={clsx(
                              "category-chip",
                              isActive && "category-chip-active",
                            )}
                            onPress={() => toggleDraftDifficulties(diff)}
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
                    {draftCategories.length > 0
                      ? ` (${draftCategories.length})`
                      : ""}
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

export default NewsFilterModal;
