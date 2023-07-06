import HeaderOnAuth from "./HeaderOnAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderOnAuth />
      <main className="h-screen bg-gray-100 dark:bg-slate-900">{children}</main>
    </div>
  );
}
