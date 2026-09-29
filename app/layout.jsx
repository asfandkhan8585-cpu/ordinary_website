import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'ordinarychat - Write like yourself. Just clearer.',
  description: 'An all in one writing assistant that helps you turn rough ideas into clear, natural writing. Starting with Gmail and LinkedIn.',
  verification: { google: '6UuQjDQuTTukgVWjAOD-22wSazz96J5huK1ozOMrzm0' }
};

export default function RootLayout({ children }) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;450;500;600&display=swap" rel="stylesheet" /></head><body>{children}<Script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js" strategy="afterInteractive" /></body></html>;
}
