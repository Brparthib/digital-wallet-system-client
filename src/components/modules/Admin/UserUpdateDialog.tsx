/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUserInfoUpdateMutation,
  useUserWalletQuery,
} from "@/redux/features/user/user.api";
import { useUpdateUserWalletMutation } from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// ✅ Schema for form validation
const formSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED"]),
  approval: z.enum(["APPROVED", "SUSPEND"]),
  walletStatus: z.enum(["BLOCKED", "UNBLOCKED"]),
});

export function UserUpdateDialog({ userData }: { userData: IUser }) {
  const [open, setOpen] = useState(false);
  const { _id, phone, status, approval } = userData;

  const { data: walletData } = useUserWalletQuery({
    phone: phone,
    fields: "status, -_id",
  });

  const [userInfoUpdate, { isLoading: isUpdating }] =
    useUserInfoUpdateMutation();
  const [updateUserWallet, { isLoading: walletLoading }] =
    useUpdateUserWalletMutation();

  const walletStatus = walletData?.data?.[0]?.status || "UNBLOCKED";

  // ✅ Setup react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: (status as "ACTIVE" | "BLOCKED") || "ACTIVE",
      approval: (approval as "APPROVED" | "SUSPEND") || "APPROVED",
      walletStatus: (walletStatus as "BLOCKED" | "UNBLOCKED") || "UNBLOCKED",
    },
  });

  // ✅ Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Updating user...");
    try {
      await userInfoUpdate({
        id: _id,
        userInfo: {
          status: values.status || status,
          approval: values.approval || approval,
        },
      }).unwrap();

      await updateUserWallet({
        phone: phone,
        status: values.walletStatus || walletStatus,
      }).unwrap();

      toast.success("User updated successfully!", { id: toastId });
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:shadow-2xl hover:bg-background hover:text-primary cursor-pointer transition-all duration-500"
          variant="outline"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Manage user: <span className="font-medium">{phone}</span> <br />
            Wallet: <span className="font-medium">{walletStatus}</span>
          </DialogDescription>
        </DialogHeader>

        {/* ✅ shadcn Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Approval */}
            <FormField
              control={form.control}
              name="approval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approval</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approval" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="SUSPEND">Suspend</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Wallet Status */}
            <FormField
              control={form.control}
              name="walletStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                      <SelectItem value="UNBLOCKED">Unblocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isUpdating || walletLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isUpdating || walletLoading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
