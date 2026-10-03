import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'الرحمن کارگو سروس', description:'ٹریلر، بیڈ فورڈ، ٹرک اور مزدا بکنگ اور کارگو منیجمنٹ', manifest:'/manifest.webmanifest', appleWebApp:{capable:true,title:'الرحمن کارگو'} };
export const viewport: Viewport = { width:'device-width', initialScale:1, themeColor:'#102d2b' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ur" dir="rtl"><body>{children}</body></html>; }
