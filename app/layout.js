import TranslationLayout from "@/components/translation/translationLayout";
import "@/public/assets/css/magnific-popup.min.css";
import "@/public/assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { WhatsApp, Phone } from '@mui/icons-material';
import { AuthProvider } from '@/contexts/AuthContext';

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-main-family",
  display: "swap",
});

const dm = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-btn-family",
  display: "swap",
});

export const metadata = {
  title: 'Erbil',
  description: 'Erbil Cars',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`body counter-scroll`}>
        <AuthProvider>
          <TranslationLayout>
            {children}
          </TranslationLayout>
        </AuthProvider>
        <div class="row" style={{
          float: 'right',
          position: 'fixed',
          'zIndex': 99999,
          right: 10,
          padding: 0,
          fontWeight: 'bold',
          width: '50px',
          height: '100px',
          borderRadius: '5px 0px 0px 5px',
          fontSize: '25px',
          textAlign: 'center',
          bottom: '45%',
          backgroundColor: '#0E2A2E',
        }}>
          <a style={{
            borderRadius: '5px 0px 0px 0px',
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} href="https://wa.me/971557754102" target="_blank">
            <WhatsApp sx={{ color: '#fff', fontSize: 30 }} />
          </a>
          <a href="tel:+971557754102" style={{
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} class="phone-call-btn">
            <Phone sx={{ color: '#fff', fontSize: 30 }} />
          </a>
        </div>
      </body>
    </html>
  );
}
