import { Button } from "@/commons/components/ui/button";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";

interface LandingCardProps {
  title: string;
  desc: string;
  asChild?: boolean;
}

export default function CourierNav({ title, desc, asChild }: LandingCardProps) {
  return (
    <nav className="w-full bg-primary">
      <div className="flex justify-between items-center py-5 px-6 rounded-b-lg mx-auto max-w-7xl">
        {/* Title and Icon */}
        <div className="flex flex-col">
          <h1 className="text-3xl text-white font-extrabold tracking-wide flex items-center gap-2">
            Deepak's {title}
            <TbTruckDelivery className="h-8 w-8 text-yellow-300" />
          </h1>
          <p className="text-sm text-gray-200 mt-1">{desc}</p>
        </div>

        {/* Logout Button */}
        <div>
          <Link href="/">
            <Button variant="outline" className="hover:bg-gray-100 hover:text-black transition-colors">
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
