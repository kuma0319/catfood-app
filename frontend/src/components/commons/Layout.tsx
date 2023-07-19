import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";

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
      <main className="mx-auto max-w-screen-xl bg-gray-100">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
