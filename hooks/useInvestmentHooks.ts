export const parseAmount = (amount: string): number => {
    const value = parseFloat(amount.replace(/[^0-9.]/g, ""));

    if (Number.isNaN(value)) {
        return 0;
    }

    if (amount.includes("B")) {
        return value * 1000;
    }

    if (amount.includes("K")) {
        return value / 1000;
    }

    return value;
};

export const getSector = (content: string): string => {
    const text = content.toLowerCase();

    if (text.includes("robotic")) return "Robotics";
    if (text.includes("cybersecurity")) return "Cybersecurity";
    if (text.includes("energy")) return "Energy";
    if (text.includes("infrastructure")) return "Infrastructure";
    if (text.includes("health")) return "Healthcare";
    if (text.includes("fintech")) return "Fintech";

    return "Technology";
};

export const getDetail = (
    investors: string[],
    round: string,
    roundCategory: string,
): string => {
    const investor = investors?.find((item) => item && item.trim());

    if (investor) {
        return investor;
    }

    if (round && round !== "Unknown") {
        return round;
    }

    if (roundCategory && roundCategory !== "Unknown") {
        return roundCategory;
    }

    return "Funding";
};
