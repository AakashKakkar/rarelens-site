import { Metadata } from "next";

const baseUrl = "https://rarelens-site.vercel.app"; // update this

export const metadata: Metadata = {
  title: "Aakash sees Ridhima’s answers every day.",
  description: "You’re not seeing it.",
  openGraph: {
    title: "Aakash sees Ridhima’s answers every day.",
    description: "You’re not seeing it.",
    images: [
      {
        url: `${baseUrl}/og/profile-aggressive.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash sees Ridhima’s answers every day.",
    description: "You’re not seeing it.",
    images: [`${baseUrl}/og/profile-aggressive.png`],
  },
};

export default function Page() {
  return <div>Preview test</div>;
}