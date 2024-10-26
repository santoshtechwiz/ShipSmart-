import { Button } from "@/commons/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/commons/components/ui/card";
import { courierConfig, loginConfig } from "@/commons/config";
import Link from "next/link";

interface LandingCardProps {
  title: string;
  desc: string;
  asChild?: boolean;
}

export default function LandingCard({
  title,
  desc,
  asChild,
}: LandingCardProps) {
  return (
    <Card className="max-w-lg w-full shadow-lg rounded-md">
      <CardHeader className="bg-primary text-center items-center text-white rounded-t-md p-4">
        <CardTitle className="text-3xl font-semibold -skew-x-12 font-mono">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300 text-xs mt-2">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center mt-4 p-4">
        Select Platform
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Link href={loginConfig.route} className="w-full">
            <Button variant="outline" className="w-full" aria-label="Sign in as Customer">
              Sign in as Customer
            </Button>
          </Link>
          <Link href={courierConfig.route} className="w-full">
            <Button variant="outline" className="w-full" aria-label="Sign in as Supplier">
              Sign in as Supplier
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
