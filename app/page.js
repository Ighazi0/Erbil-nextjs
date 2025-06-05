import Layout from "@/components/layout/Layout";
import CarListV2 from "@/components/sections/CarListV2";
import CounterCar from "@/components/sections/CounterCar";
import SlideFormV2 from "@/components/sections/SlideFormV2";
import PopularMakesTab1 from "@/components/elements/PopularMakesTab1.js";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <SlideFormV2 />
        {/* <CarListV2 h5 /> */}
        <CounterCar />
        <div className="widget-populer-makes-h5 mt-5 pt-50">
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
