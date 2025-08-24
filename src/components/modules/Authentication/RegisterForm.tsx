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
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { role } from "@/assets/constants/role";
import { toast } from "sonner";
import { addCountryCode } from "@/utils/addCountryCode";

const registerSchema = z
  .object({
    name: z
      .string({ error: "Name must be string." })
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    phone: z
      .string({ error: "Phone number must be string." })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      }),
    role: z.string({ error: "Role must be string." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must be contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Password do not match",
    path: ["confirmedPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      role: "",
      password: "",
      confirmedPassword: "",
    },
  });
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const formatted = addCountryCode;
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = toast.loading("Register User...");
    const userInfo = {
      name: data.name,
      phone: formatted(data.phone, "BD"),
      role: data.role,
      password: data.password,
    };

    try {
      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success("Register Successfully.", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong..!", { id: toastId });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Write your full name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your full name to display
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={role.user}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={role.user}>{role.user}</SelectItem>
                      <SelectItem value={role.agent}>{role.agent}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="sr-only">
                    You can select your role.
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
            <FormField
              control={form.control}
              name="confirmedPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmed Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Confirm your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Register
            </Button>
          </form>
        </Form>
        <div className="h-[1px] bg-border"></div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
