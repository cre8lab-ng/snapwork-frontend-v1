
import ExploreServices from "@/components/explore-services";
import Navbar from "@/components/navbar";
import PromoBanners from "@/components/promo-banners";
import WebPageTitle from "@/components/webpagetitle";



export default function Home() {
  return (
    <>
      <WebPageTitle title="Booking | Snapwork" />
      <Navbar/>
      <ExploreServices/>
      <PromoBanners/>
    </>
  );
}
