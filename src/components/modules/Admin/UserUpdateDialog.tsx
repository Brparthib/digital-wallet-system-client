/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { Approval, IUser, TStatus, TWalletStatus } from "@/types";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ✅ Schema for form validation
const formSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  approval: z.enum(["APPROVED", "SUSPEND"]).optional(),
  walletStatus: z.enum(["BLOCKED", "UNBLOCKED"]).optional(),
});

export function UserUpdateDialog({ userData }: { userData: IUser }) {
  const [open, setOpen] = useState(false);
  const { _id, name, phone, status, approval } = userData;

  const { data: walletData, isLoading: loadingWalletStatus } =
    useUserWalletQuery({
      phone: phone,
      fields: "status, -_id",
    });

  const [userInfoUpdate, { isLoading: isUpdating }] =
    useUserInfoUpdateMutation();
  const [updateUserWallet, { isLoading: walletLoading }] =
    useUpdateUserWalletMutation();

  const walletStatus = walletData?.data?.[0]?.status as TWalletStatus;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: status as TStatus,
      approval: approval as Approval,
      walletStatus: walletStatus as TWalletStatus,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Updating user...");
    console.log(values.walletStatus);
    try {
      const userRes = await userInfoUpdate({
        id: _id,
        userInfo: {
          status: values.status || status,
          approval: values.approval || approval,
        },
      }).unwrap();

      const walletRes = await updateUserWallet({
        phone: phone,
        walletStatus: { status: values.walletStatus || walletStatus },
      }).unwrap();

      if (userRes.success && walletRes.success) {
        toast.success("User updated successfully!", { id: toastId });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user", {
        id: toastId,
      });
    }
  };

  if (loadingWalletStatus) {
    return <h1>loading...</h1>;
  }

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
          <DialogDescription className="space-y-4 text-lg font-normal leading-relaxed text-gray-400 border p-4 rounded-md my-4">
            <div className="flex flex-col gap-2">
              <div>
                Name: <span className="font-semibold text-primary">{name}</span>
              </div>
              <div>
                Phone:{" "}
                <span className="font-semibold text-primary">{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                Wallet:
                <Badge
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    walletStatus === "UNBLOCKED" && "bg-green-500 text-white",
                    walletStatus === "BLOCKED" && "bg-rose-500 text-white"
                  )}
                >
                  {walletStatus}
                </Badge>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="statusId"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-4"
          >
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
                      <SelectTrigger className="w-full">
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
                      <SelectTrigger className="w-full">
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Wallet Stats" />
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
          </form>
        </Form>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            form="statusId"
            type="submit"
            disabled={isUpdating || walletLoading}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            {isUpdating || walletLoading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
