import TranslationLayout from "@/components/translation/translationLayout";
import "@/public/assets/css/magnific-popup.min.css";
import "@/public/assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { WhatsApp, Phone, LocationOn } from "@mui/icons-material";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  title: "Erbil",
  description: "Erbil Cars",
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
          <TranslationLayout>{children}</TranslationLayout>
        </AuthProvider>
        <div
          className="row"
          style={{
            float: "right",
            position: "fixed",
            zIndex: 99999,
            right: 10,
            padding: 0,
            fontWeight: "bold",
            width: "35px",
            height: "135px",
            borderRadius: "5px 0px 0px 5px",
            fontSize: "25px",
            textAlign: "center",
            bottom: "45%",
            backgroundColor: "#0E2A2E",
          }}
        >
          <a
            style={{
              borderRadius: "5px 0px 0px 0px",
              height: "33.33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#25D366",
            }}
            href="https://wa.me/971557754102"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp sx={{ color: "#fff", fontSize: 20 }} />
          </a>
          <a
            href="tel:+971557754102"
            style={{
              height: "33.33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0E2A2E",
            }}
            className="phone-call-btn"
          >
            <Phone sx={{ color: "#fff", fontSize: 20 }} />
          </a>
          <a
            href="https://maps.app.goo.gl/KEMiwajem3UxUQHK7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: "0 0 0 5px",
              height: "33.33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#A88E70",
            }}
            title="Location"
          >
            <LocationOn sx={{ color: "#fff", fontSize: 20 }} />
          </a>
        </div>
        <GoogleAnalytics gaId={"G-6B6G8HY79K"} />
      </body>
    </html>
  );
}
