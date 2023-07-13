/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getBuildConfig } from "./config/build";
import AuthContext from "./auth-context";

const buildConfig = getBuildConfig();
import { getClientConfig } from "./config/client";

export const metadata = {
  title: "PhatGPT Next Web",
  description: "Your personal PhatGPT Chat Bot.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "PhatGPT Next Web",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}
