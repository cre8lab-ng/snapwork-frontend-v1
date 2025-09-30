import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const handleUserClick = () => {
    // Handle user click functionality
    console.log("User button clicked");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onUserClick={handleUserClick} />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
