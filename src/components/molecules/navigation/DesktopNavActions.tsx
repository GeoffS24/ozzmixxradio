import { Button } from "@/components/atoms/ui/Button";
import Link from "next/link";

export function DesktopNavActions() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Link href="/#listen" 
       scroll={true}
      >
        <Button className="flex px-5 py-2 justify-center items-center gap-2 border border-persimmon bg-persimmon text-base font-medium leading-[150%] text-white hover:bg-persimmon-600 transition-colors">
          Listen
        </Button>
      </Link>
    </div>
  );
}
