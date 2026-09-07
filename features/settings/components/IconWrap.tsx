import { Box } from "@/components/ui/box";
import { Palette, type LucideIcon } from "lucide-react-native";
import React from "react";

export interface IconWrapProps {
    bg?: string;
    icon?: LucideIcon | React.ElementType;
    color?: string;
    children?: React.ReactNode;
}

export const IconWrap = ({
    bg = "#7C8BE0",
    icon: IconComponent,
    color = "#FFFFFF",
    children,
}: IconWrapProps) => {
    return (
        <Box
            style={{
                backgroundColor: bg,
                padding: 8,
            }}
            className="rounded-full mr-2"
        >
            {children ? (
                children
            ) : IconComponent ? (
                <IconComponent size={20} color={color} strokeWidth={2} />
            ) : (
                <Palette size={20} color={color} strokeWidth={2} />
            )}
        </Box>
    );
};
