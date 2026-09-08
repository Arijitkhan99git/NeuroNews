export interface SystemSection {
  heading?: string;
  body: string;
}

export interface SystemItem {
  id: "privacy" | "terms" | "about";
  title: string;
  subtitle?: string;
  version?: string;
  sections: SystemSection[];
}

export const systemData: Record<"privacy" | "terms" | "about", SystemItem> = {
  privacy: {
    id: "privacy",
    title: "Privacy & Security",
    subtitle: "How we protect and handle your personal data",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "NeuroNews prioritizes user privacy. We only store minimal preferences locally on your device, such as selected language, period filters, and bookmarked articles. No personal identity data is sold or shared.",
      },
      {
        heading: "2. Data Security & Encryption",
        body: "All communications between the NeuroNews app and our servers use HTTPS with TLS 1.3 encryption. Your data is guarded against unauthorized access using industry-standard security protocols.",
      },
      {
        heading: "3. Analytics & Performance",
        body: "We aggregate non-identifiable telemetry to monitor app performance, crash reports, and api latency. You can opt out of analytics sharing anytime in settings.",
      },
      {
        heading: "4. Your Rights & Control",
        body: "You maintain total control over your local stored data. Clearing cache or resetting app preferences in the settings page wipes all cached data instantly.",
      },
      {
        heading: "5. Contact & Support",
        body: "If you have any questions or concerns regarding our privacy practices, please contact our security team at privacy@neuronews.app.",
      },
    ],
  },
  terms: {
    id: "terms",
    title: "Terms of Service",
    subtitle: "Rules and guidelines for using NeuroNews",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By downloading, installing, or using NeuroNews, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue app usage.",
      },
      {
        heading: "2. Intellectual Property Rights",
        body: "All application design elements, AI summary algorithms, code, graphics, and brand marks are owned by NeuroNews. Original news contents belong to their respective publishers and are attributed accordingly.",
      },
      {
        heading: "3. User Conduct",
        body: "Users agree not to reverse engineer, scrape, or perform automated queries against NeuroNews APIs, nor attempt to bypass application security barriers.",
      },
      {
        heading: "4. Disclaimer & Warranties",
        body: "NeuroNews provides AI-generated digests and real-time tech intelligence on an 'as-is' basis. While we aim for high accuracy, we do not guarantee uninterrupted operational availability.",
      },
      {
        heading: "5. Modifications",
        body: "We reserve the right to update these terms at any time. Continued use of the app after updates constitutes acceptance of the revised Terms of Service.",
      },
    ],
  },
  about: {
    id: "about",
    title: "About NeuroNews",
    subtitle: "Next-Gen AI Tech & Investment Intelligence",
    version: "1.0.0",
    sections: [
      {
        heading: "Our Mission",
        body: "NeuroNews bridges the gap between massive tech news volume and actionable intelligence. We curate, summarize, and rank critical technology & investment updates in real-time.",
      },
      {
        heading: "Key Highlights",
        body: "• AI Daily Digest & Metrics\n• Real-Time Tech & Market Updates\n• Practical AI Workflow Tips\n• Clean, Distraction-Free Mobile Experience",
      },
      {
        heading: "Technology Stack",
        body: "Engineered with Expo, React Native, NativeWind v4, and state-of-the-art AI summarization models designed for maximum performance.",
      },
      {
        heading: "Credits & Legal",
        body: "Developed by the NeuroNews Team. Copyright © 2026 NeuroNews Inc. All rights reserved.",
      },
    ],
  },
};
