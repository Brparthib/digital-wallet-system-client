import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const loginSchema = z.object({
  phone: z.string(),
  password: z.string({ error: "Password is required." }),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      phone: "+88" + data.phone,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();
      if (res.success) {
        toast.success("User logged in successfully.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong..!");
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+880-XXXXXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Set your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </form>
        </Form>
        <div className="h-[1px] bg-border"></div>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
