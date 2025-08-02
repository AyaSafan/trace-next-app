// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "LinkVault",
  description: "LinkVault is a platform for storing and managing your links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
