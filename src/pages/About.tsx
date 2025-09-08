import { ShieldCheck, Wallet, Send, History } from "lucide-react";

const feature = [
  {
    title: "Secure Transactions",
    description:
      "Your money is protected with bank-level encryption and multiple layers of security.",
    icon: <ShieldCheck className="size-6" />,
  },
  {
    title: "Easy Wallet Management",
    description:
      "Add money, withdraw cash, and manage your balance instantly from your phone.",
    icon: <Wallet className="size-6" />,
  },
  {
    title: "Send Money Instantly",
    description:
      "Transfer money to anyone, anytime, anywhere in just a few taps.",
    icon: <Send className="size-6" />,
  },
  {
    title: "Track Every Transaction",
    description:
      "Stay in control with real-time transaction history and detailed records.",
    icon: <History className="size-6" />,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm text-muted-foreground">WHY CHOOSE US</p>
            <h2 className="text-3xl font-medium md:text-5xl">
              A <span className="text-primary">Smarter</span> Way to Handle Your
              Money
            </h2>

            <p className="text-muted-foreground md:max-w-2xl">
              Our digital wallet makes payments simple, fast, and secure. From
              adding money to sending it instantly, everything is designed to
              give you full control of your finances with ease.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {feature.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-card p-6 md:min-h-[200px] md:p-8"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
