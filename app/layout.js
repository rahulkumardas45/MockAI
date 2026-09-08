import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "./dashboard/_components/Footer";
import Header from "./dashboard/_components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ['system-ui', 'arial', 'sans-serif']
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ['Courier New', 'monospace']
});

export const metadata = {
  metadataBase: new URL('https://www.mockmateai.com'),
  title: {
    default: 'Mock AI - Next-Gen AI Mock Interview Platform',
    template: '%s | Mock AI'
  },
  description: 'Master technical & behavioral interviews with real-time AI speech recognition, personalized smart coaching, instantaneous scoring, and detailed actionable feedback.',
  keywords: [
    'AI interview preparation', 
    'mock interviews', 
    'interview coaching', 
    'career development', 
    'job interview help',
    'AI speech recognition'
  ],
  authors: [{ name: 'Mock AI Team' }],
  creator: 'Mock AI',
  publisher: 'Mock AI',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mockmateai-eta.vercel.app/',
    title: 'Mock AI - Next-Gen AI Mock Interview Platform',
    description: 'Elevate your interview performance with AI-powered mock interviews, live speech assessment, and real-time smart feedback.',
    siteName: 'Mock AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mock AI - Revolutionizing Interview Preparation'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Mock AI - Next-Gen AI Mock Interview Platform',
    description: 'Elevate your interview performance with AI-powered mock interviews, live speech assessment, and real-time smart feedback.',
    creator: '@MockAI',
    images: ['/twitter-image.png']
  },
  
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body 
          className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-slate-100 overflow-x-hidden relative transition-colors duration-300"
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {/* Ambient Background Lights */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] animate-pulse-glow" />
              <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
              <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 dark:opacity-40" />
            </div>

            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg shadow-lg"
            >
              Skip to main content
            </a>
            
            <Header />
            
            <main 
              id="main-content" 
              className="flex-grow pt-20 w-full min-h-screen relative z-10"
            >
              {children}
            </main>
            
            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}