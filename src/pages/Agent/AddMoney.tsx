import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCashInMutation } from "@/redux/features/agent/agent.api";
import { addCountryCode } from "@/utils/addCountryCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addMoneySchema = z.object({
  phone: z.string(),
  amount: z.string(),
});

export default function AddMoney() {
  const form = useForm<z.infer<typeof addMoneySchema>>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      phone: "",
      amount: "",
    },
  });
  const [cashIn] = useCashInMutation();

  const formatted = addCountryCode;
  const onSubmit = async (data: z.infer<typeof addMoneySchema>) => {
    const toastId = toast.loading("Cash in Money...");
    const payload = {
      toPhone: formatted(data.phone, "BD"),
      amount: Number(data.amount),
    };

    try {
      const res = await cashIn(payload).unwrap();
      if (res.success) {
        toast.success("Cash in successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <div className="mx-auto w-full md:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Add Money</CardTitle>
          <CardDescription className="text-md">
            Top up your wallet instantly with safe and easy transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-money"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the phone number" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is is receiver phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the amount" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is is receiver phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            className="ml-auto cursor-pointer"
            form="add-money"
            type="submit"
          >
            Cash In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
