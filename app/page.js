import Layout from "@/components/layout/Layout";
import SlideFormV2 from "@/components/sections/SlideFormV2";
import PopularMakesTab1 from "@/components/elements/PopularMakesTab1.js";
import BannerSlider from "@/components/elements/banners_slider.js";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <BannerSlider />

        <SlideFormV2 />
        <div className="widget-populer-makes-h5 mt-5 pt-25">
          <div className="themesflat-container">
            <div className="populer-makes">
              <PopularMakesTab1 />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
