import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import React from "react";
import TopFunding from "./TopFunding";

const InvestmentHomePage = () => {
  return (
    <VStack>
      <SectionHeading>Investment Intel</SectionHeading>
      <TopFunding />
    </VStack>
  );
};

export default InvestmentHomePage;
