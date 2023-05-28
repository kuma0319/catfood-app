import Footer from "@/components/Footer";
import Header from "@/components/Header";

import("preline");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <header>
        <Header />
      </header>
      <main className="mx-auto max-w-screen-lg bg-gray-100">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
