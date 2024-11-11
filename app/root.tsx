import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinkDescriptor, LinksFunction } from "@remix-run/node";
import { fonts } from "natmfat/integrations/remix";

import "./tailwind.css";
import "natmfat/styles/core.css";
import { ThemeProvider } from "natmfat/components/ThemeProvider";

export const links: LinksFunction = () => [...(fonts as LinkDescriptor[])];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark">
        <ThemeProvider value="dark">{children}</ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
