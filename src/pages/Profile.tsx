/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useEffect } from "react";
import { toast } from "sonner";
import { Phone, MapPin, Shield, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { role } from "@/assets/constants/role";
import { Textarea } from "@/components/ui/textarea";
import Password from "@/components/ui/password";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/redux/features/user/user.api";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  email: z.string("Invalid email address.").optional(),
  role: z.string({ error: "Role must be string" }).optional(),
  address: z.string({ error: "Address must be string" }).optional(),
  password: z.string({ error: "Password must be string" }).optional(),
});

export default function Profile() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [userInfoUpdate, { isLoading: isUpdating }] =
    useUserInfoUpdateMutation();
  const user = data?.data;

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      address: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        address: user.address || "",
        password: "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    const toastId = toast.loading("Updating profile...");

    const updatedInfo = {
      name: data.name || user.name,
      email: data.email || user.email,
      role: data.role || user.role,
      address: data.address || user.address,
      password: data.password,
    };

    if (updatedInfo.password === "") {
      delete updatedInfo.password;
    }

    if (updatedInfo.email === "") {
      delete updatedInfo.email;
    }

    console.log(updatedInfo);

    try {
      const res = await userInfoUpdate({
        id: user._id,
        userInfo: updatedInfo,
      }).unwrap();
      if (res.success) {
        console.log(res);
        toast.success("Profile updated successfully!", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile container mx-auto p-6">
      <Card className="bg-background text-foreground p-0">
        <CardHeader className="bg-muted/50 dark:bg-muted/30 py-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-md">
              <AvatarImage
                src={user?.picture || "/placeholder-user.jpg"}
                alt="Profile"
              />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column: Read-only Profile Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">
              Profile Details
            </h3>
            <Separator />
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base">{user?.phone || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-base">{user?.address || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={user?.isVerified ? "default" : "secondary"}>
                    {user?.isVerified ? "Verified" : "Not Verified"}
                  </Badge>
                  <Badge
                    variant={
                      user?.status === "ACTIVE" ? "default" : "destructive"
                    }
                  >
                    {user?.status || "Unknown"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="text-base">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                Edit Profile
              </h3>
              <Separator />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
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
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={user.role}
                    >
                      <FormControl>
                        <SelectTrigger className="border-border w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={role.user}>User</SelectItem>
                        <SelectItem value={role.agent}>Agent</SelectItem>
                        {user.role === role.admin && (
                          <SelectItem value={role.admin}>
                            {role.admin}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter new address"
                        {...field}
                        className="border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end pt-6 px-0">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer"
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
