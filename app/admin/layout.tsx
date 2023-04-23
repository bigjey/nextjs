export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 border-red-400 border-dotted relative border-2">
      <div className="absolute left-1 top-1 text-red-400">admin layout</div>
      {children}
    </div>
  );
}
