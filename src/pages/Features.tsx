import {
  DollarSign,
  Send,
  Wallet,
  History,
  Users,
  ArrowDownCircle,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Features() {
  const userFeatures: Feature[] = [
    {
      title: "Add Money (Cash-In)",
      description:
        "Users can add money to their wallet through agents without any charge.",
      icon: <Wallet className="size-4 md:size-6" />,
    },
    {
      title: "Withdraw Money (Cash-Out)",
      description:
        "Withdraw cash through agents with a small service charge applied.",
      icon: <ArrowDownCircle className="size-4 md:size-6" />,
    },
    {
      title: "Send Money",
      description:
        "Easily send money to other users instantly with a minimal transfer fee.",
      icon: <Send className="size-4 md:size-6" />,
    },
    {
      title: "Transaction History",
      description:
        "View and track all your transactions in real-time for full transparency.",
      icon: <History className="size-4 md:size-6" />,
    },
  ];

  const agentFeatures: Feature[] = [
    {
      title: "Cash-In for Users",
      description: "Agents can add money to users' wallets without any charge.",
      icon: <Users className="size-4 md:size-6" />,
    },
    {
      title: "Cash-Out Service",
      description:
        "Agents provide cash-out services and earn commission while users pay a fee.",
      icon: <DollarSign className="size-4 md:size-6" />,
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">
          Our Core Features
        </p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
          User & Agent <span className="text-primary">Features</span>
        </h2>

        <div>
          {/* User Features */}
          <div className="mt-10">
            <h3 className="mb-6 text-xl font-semibold md:pl-5">
              User Features
            </h3>
            <div className="mx-auto grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6">
              {userFeatures.map((feature, idx) => (
                <div
                  className="flex gap-6 rounded-lg md:block md:p-5"
                  key={idx}
                >
                  <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary md:size-12">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-medium md:mb-2 md:text-xl">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Features */}
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-semibold md:pl-5">
              Agent Features
            </h3>
            <div className="mx-auto grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6">
              {agentFeatures.map((feature, idx) => (
                <div
                  className="flex gap-6 rounded-lg md:block md:p-5"
                  key={idx}
                >
                  <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary md:size-12">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-medium md:mb-2 md:text-xl">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
