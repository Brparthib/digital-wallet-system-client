import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold text-rose-500">
        You are Unauthorized...!
      </h1>
      <Button className="hover:text-primary hover:bg-background cursor-pointer" variant="outline">
        <Link to="/">Back To Home</Link>
      </Button>
    </div>
  );
}
