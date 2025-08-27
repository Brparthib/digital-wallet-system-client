/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from "@/components/ui/textarea";
import { useSendMoneyMutation } from "@/redux/features/user/user.api";
import { addCountryCode } from "@/utils/addCountryCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const sendMoneySchema = z.object({
  phone: z.string(),
  amount: z.string(),
  note: z.string(),
});

export default function SendMoney() {
  const form = useForm<z.infer<typeof sendMoneySchema>>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      phone: "",
      amount: "",
      note: "",
    },
  });
  const [sendMoney] = useSendMoneyMutation();
  const navigate = useNavigate();

  const formatted = addCountryCode;
  const onSubmit = async (data: z.infer<typeof sendMoneySchema>) => {
    console.log(data);
    const toastId = toast.loading("Sending Money...");
    const payload = {
      toPhone: formatted(data.phone, "BD"),
      amount: Number(data.amount),
      note: data.note,
    };

    try {
      const res = await sendMoney(payload).unwrap();
      if (res.success) {
        toast.success("Sent money successfully", { id: toastId });
      }
      navigate("/user/my-transactions");
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <div className="sendMoney mx-auto w-full md:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Send Money</CardTitle>
          <CardDescription className="text-md">
            Top up your wallet instantly with safe and easy transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="send-money"
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
                      This is receiver phone number.
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
                      This is amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write a short note" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is short note.
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
            form="send-money"
            type="submit"
          >
            Transfer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
