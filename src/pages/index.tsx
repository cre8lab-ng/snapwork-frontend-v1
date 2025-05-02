
import ExploreServices from "@/components/explore-services";
import OTPModal from "@/components/modals/otp";
import SignInModal from "@/components/modals/sign-in";
import { SignUpModal } from "@/components/modals/sign-up";
import Navbar from "@/components/navbar";
import PromoBanners from "@/components/promo-banners";
import WebPageTitle from "@/components/webpagetitle";
import { useState } from "react";



export default function Home() {
  const [modalType, setModalType] = useState<'signin' | 'signup' | 'verify' | null>(null);

  return (
    <>
      <WebPageTitle title="Booking | Snapwork" />
      <Navbar onUserClick={() => setModalType('signin')} />
      <ExploreServices/>
      <PromoBanners/>

      {modalType === 'signin' && (
        <SignInModal
          onClose={() => setModalType(null)}
          onContinue={() => setModalType('verify')}
          onSwitchToSignUp={() => setModalType('signup')}
        />
      )}

      {modalType === 'verify' && (
        <OTPModal
          onClose={() => setModalType(null)}
          onBack={() => setModalType('signin')}
        />
      )}

      {modalType === 'signup' && (
        <SignUpModal
          onClose={() => setModalType(null)}
          onSwitch={() => setModalType('signin')}
        />
      )}
    </>
  );
}
