import { Metadata } from "next";

const baseUrl = "https://www.rarelens.ai";

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${baseUrl}/og/profile-aggressive.png`;

  return {
    title: "Aakash sees Ridhima’s answers every day.",
    description: "You’re not seeing it.",
    openGraph: {
      title: "Aakash sees Ridhima’s answers every day.",
      description: "You’re not seeing it.",
      url: `${baseUrl}/preview/profile`,
      type: "website",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl, // important for WhatsApp
          width: 1200,
          height: 630,
          alt: "RareLens preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Aakash sees Ridhima’s answers every day.",
      description: "You’re not seeing it.",
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return (
    <div style={{ padding: 40, fontSize: 18 }}>
      Preview test page
    </div>
  );
}