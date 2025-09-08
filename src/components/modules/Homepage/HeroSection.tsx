import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-20 md:py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Logo />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Simplify Your <span className="text-primary">Payments</span>
                <br />
                Anytime, Anywhere
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Send, receive, and manage your money securely with just a tap.
                Fast, reliable, and always in your pocket.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                asChild
                type="button"
                variant="outline"
                className="group cursor-pointer hover:text-primary"
              >
                <Link to="/about">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
