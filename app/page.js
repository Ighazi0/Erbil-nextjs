import Layout from "@/components/layout/Layout";
import SlideFormV2 from "@/components/sections/SlideFormV2";
import PopularMakesTab1 from "@/components/elements/PopularMakesTab1.js";
import BannerSlider from "@/components/elements/banners_slider.js";
import FeaturesComponent from "@/components/elements/FeaturesComponent";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <BannerSlider />
        <SlideFormV2 />
        <FeaturesComponent />

        <PopularMakesTab1 />
      </Layout>
    </>
  );
}
