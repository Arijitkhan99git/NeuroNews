import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import React, { useState } from "react";

const ICON_SIZE = 60;

const AppIcon = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Fallback: simple colored box so layout never collapses
    return (
      <Box
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
        className="rounded-xl bg-secondary items-center justify-center"
      />
    );
  }

  return (
    <Image
      source={require("@/assets/icon/neuronews_icon.png")}
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
      contentFit="contain"
      cachePolicy="memory-disk"
      onError={() => setHasError(true)}
    />
  );
};

export default AppIcon;
