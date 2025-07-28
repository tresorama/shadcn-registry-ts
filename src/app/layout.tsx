import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./tailwind.css";

import { ds } from "@/lib/ds";
import { GlobalNextServerDataProvider } from "@/components/views/global-next-server-data/server-component";
import { RootWithSidebar } from "@/components/views/root-with-sidebar/server-component/root";
import { CommandPalette } from "@/components/views/command-palette/client-component/command-palette";

// seo metadata

export const metadata: Metadata = {
  title: { default: "Home · tresorama/shadcn-registry", template: "%s · tresorama/shadcn-registry" },
  description: "Typescript utilities served as a shadcn registry!",
};

// main comp

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // NOTE: suppressHydrationWarning is required for next-themes
      suppressHydrationWarning
    >
      <body
        className={`${ds.bodyClassName} antialiased`}
      >
        <GlobalNextServerDataProvider>
          <ThemeProvider attribute="class">
            <RootWithSidebar>
              {children}
              <CommandPalette />
            </RootWithSidebar>
          </ThemeProvider>
        </GlobalNextServerDataProvider>
      </body>
    </html>
  );
}
