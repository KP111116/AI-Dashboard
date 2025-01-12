import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <nav className="bg-blue-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="text-lg font-semibold">
                <Link href="/">AI Productivity Dashboard</Link>
              </div>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/tasks" className="hover:underline">
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:underline">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white text-center py-4">
            &copy; {new Date().getFullYear()} AI Productivity Dashboard. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
