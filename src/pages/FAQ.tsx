import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "faq-1",
    question: "How do I add money to my wallet?",
    answer:
      "You can add money (cash-in) through an authorized agent. Cash-in is free and no extra charges will be applied.",
  },
  {
    id: "faq-2",
    question: "How do I withdraw money from my wallet?",
    answer:
      "You can withdraw money (cash-out) through an agent. A small service charge will apply during cash-out.",
  },
  {
    id: "faq-3",
    question: "Can I send money to another user?",
    answer:
      "Yes, you can send money to any registered wallet user. A transaction fee will be applied automatically.",
  },
  {
    id: "faq-4",
    question: "Is there any charge for cash-in?",
    answer: "No, cash-in through agents is completely free of charge.",
  },
  {
    id: "faq-5",
    question: "Where can I view my transaction history?",
    answer:
      "You can view your complete transaction history inside your wallet app under the 'Transactions' section.",
  },
  {
    id: "faq-6",
    question: "What happens if my account is blocked?",
    answer:
      "If your account is blocked or inactive, you won’t be able to perform transactions until reactivated by the admin.",
  },
  {
    id: "faq-7",
    question: "How do agents earn commissions?",
    answer:
      "Agents earn commissions on each cash-out transaction. The commission is added automatically to their wallet.",
  },
];

export default function FAQ() {
  return (
    <section className="py-32">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <AccordionItem key={item.id} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
