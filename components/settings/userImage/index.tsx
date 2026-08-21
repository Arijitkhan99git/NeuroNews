import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import React from "react";
import { Text } from "react-native";

const UserImage = () => {
  return (
    <Box className="py-8 flex justify-center items-center gap-4">
      <Avatar className="w-40 h-40">
        <AvatarFallbackText>Jane Doe is test</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
        />
      </Avatar>
      <Box className="flex items-center gap-1">
        <Text className="text-2xl text-slate-300 font-semibold">Arijit</Text>
        <Text className=" text-gray-400">arijitkhan52@gmail.com</Text>
      </Box>
    </Box>
  );
};

export default UserImage;
