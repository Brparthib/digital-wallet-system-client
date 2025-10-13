/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { IUser } from "@/types";
import { toast } from "sonner";
import { useGiveFeedbackMutation } from "@/redux/features/feedback/feedback.api";

// ✅ Zod Schema
const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rating: z.number().min(1, "Please select a rating"),
  message: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedBack({
  openFromParent,
  user,
}: {
  openFromParent: boolean;
  user: IUser;
}) {
  const [open, setOpen] = useState(false);
  const [giveFeedback] = useGiveFeedbackMutation();

  // ✅ Automatically open when parent triggers or feedback === false
  useEffect(() => {
    if (openFromParent) {
      setOpen(true);
    }
  }, [openFromParent]);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: user?.name,
      rating: 0,
      message: "",
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    console.log("Feedback Submitted:", values);

    const toastId = toast.loading("Feedback Submitting...");
    const payload = {
      userId: user._id,
      name: values.name,
      role: user.role,
      avatar: user.picture,
      rating: values.rating,
      message: values.message,
    };

    try {
      const res = await giveFeedback(payload).unwrap();
      if (res.success) {
        toast.success("Feedback Submitted successfully", { id: toastId });
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Give Your Feedback</DialogTitle>
          <DialogDescription>
            We appreciate your thoughts! Please take a moment to share your
            experience.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rate) => (
                        <SelectItem key={rate} value={String(rate)}>
                          {rate} ⭐
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your feedback..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
