export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src="moneyTransaction.png" className="w-10 bg-primary rounded-sm p-1" alt="logo image" />
      <span className="text-2xl font-medium dark:text-white">SafeWallet</span>
    </div>
  );
}
