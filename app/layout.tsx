import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DLS 2026 — Design Language System',
  description: 'Design Language System 2026: design tokens, typography, and component showcase.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className="bg-neutral-100 font-proxima text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  )
}
