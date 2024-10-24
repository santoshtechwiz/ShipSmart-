import LandingCard from "@/commons/components/landing-card";
import { siteConfig } from "@/commons/config";
import Link from "next/link"; // Assuming you will use Link for navigation

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full space-y-10 px-6 pt-24 xs:px-36 xs:pt-36">
      <LandingCard title={siteConfig.title} desc={siteConfig.desc} />

      <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
        {/* Customer Button */}
        <Link href="/customer" className="w-full sm:w-64">
          <button className="w-full p-6 bg-blue-500 text-white font-mono text-lg font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all">
            Customer Portal
          </button>
        </Link>

        {/* Supplier Button */}
        <Link href="/supplier" className="w-full sm:w-64">
          <button className="w-full p-6 bg-green-500 text-white font-mono text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all">
            Supplier Portal
          </button>
        </Link>
      </div>
    </main>
  );
}
