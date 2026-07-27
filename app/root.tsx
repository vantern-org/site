import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
export function loader() {
  return {};
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="https://vantern.statuspage.io/embed/script.js" />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export { ErrorBoundary } from "./routes/error";