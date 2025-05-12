import Layout from "@/components/layout/Layout"
import CarListV2 from "@/components/sections/CarListV2"
import CounterCar from "@/components/sections/CounterCar"
import SlideFormV2 from "@/components/sections/SlideFormV2"
import PopulerMakes2 from "@/components/sections/PopulerMakes2"
import FormContact from "@/components/sections/FormContact"

export default function Home() {
    
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <SlideFormV2 />
                <CarListV2 h5/>
                <CounterCar />
                <PopulerMakes2 />
                {/*<FormContact />*/}
            </Layout>
        </>
    )
}