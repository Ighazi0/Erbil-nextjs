import image from "@/public/assets/images/logo/eblpng.png";

export default function Preloader() {
    return (
        <>
            <div className="preload preload-container">
                <div className="middle">
                    <img src={image.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
            </div>
        </>
    )
}
