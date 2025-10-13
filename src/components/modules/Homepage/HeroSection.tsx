import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Lottie from "lottie-react";
import moneyTransfer from "@/assets/lotties/moneyTransfer.json";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative py-20 px-10 min-h-screen flex items-center"
    >
      <div className="container mx-auto relative z-10 rounded-md px-10 border border-accent">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <div>
              <h1 className="mb-6 text-3xl md:text-5xl font-bold tracking-tight text-pretty">
                Simplify Your <span className="text-primary">Payments</span>
                <br />
                Anytime, Anywhere
              </h1>
              <p className="max-w-xl text-muted-foreground md:text-lg">
                Send, receive, and manage your money securely with just a tap.
                Fast, reliable, and always in your pocket.
              </p>
            </div>
            <div className="mt-4 flex justify-center md:justify-start gap-3">
              <Button
                asChild
                type="button"
                variant="outline"
                className="group cursor-pointer hover:text-white hover:dark:text-primary transition-all duration-500"
              >
                <Link to="/#about">Explore</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="flex-1 flex justify-center">
            <Lottie
              animationData={moneyTransfer}
              loop
              className="w-[300px] md:w-[450px] lg:w-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
