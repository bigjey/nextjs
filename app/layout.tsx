import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yo",
  description: "Ho",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-6 border-sky-400 border-dotted relative border-2">
          <div className="absolute left-1 top-1 text-sky-400">
            global layout
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
