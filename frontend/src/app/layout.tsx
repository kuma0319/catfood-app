import "../app/globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import("preline");

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="container mx-auto">
        <header>
          <Header />
        </header>
        <main className="mx-auto max-w-screen-lg bg-gray-100">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

// export default function MyApp({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <Header />
//       <body className={inter.className}>{children}</body>
//     </>
//   );
// }
