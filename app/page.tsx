import LandingCard from "@/commons/components/landing-card";
import { siteConfig } from "@/commons/config";
import Link from "next/link"; // Assuming you will use Link for navigation

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full space-y-10 px-6 pt-24 xs:px-36 xs:pt-36">
      <LandingCard title={siteConfig.title} desc={siteConfig.desc} />

    </main>
  );
}
