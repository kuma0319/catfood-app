import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";
import { kiwi_maru } from "@/utils/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`container mx-auto ${kiwi_maru.className}`}>
      <header>
        <Header />
      </header>
      <main className="mx-auto max-w-screen-lg">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
