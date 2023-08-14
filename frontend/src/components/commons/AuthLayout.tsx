import { kiwi_maru } from "@/utils/font";

import HeaderOnAuth from "./HeaderOnAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`container mx-auto ${kiwi_maru.className}`}>
      <HeaderOnAuth />
      <main className="h-screen">{children}</main>
    </div>
  );
}
