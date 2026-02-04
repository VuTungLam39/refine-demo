import "@ant-design/v5-patch-for-react-19";
import { GitHubBanner } from "@refinedev/core";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { RefineContext } from "./refine-context";

export const metadata: Metadata = {
  title: "Quản lý Sinh viên",
  description: "Ứng dụng Refine quản lý sinh viên liên thông",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Suspense>
          <GitHubBanner />
          <RefineContext defaultMode={defaultMode}>
            {children}
          </RefineContext>
        </Suspense>
      </body>
    </html>
  );
}