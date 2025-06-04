"use client"
import PopularMakesTab1 from '../elements/PopularMakesTab1'
import {FormattedMessage} from "react-intl";

export default function PopulerMakes2() {
    return (
        <>
            <div className="widget-populer-makes-h5 mt-5">
                <div className="themesflat-container">
                    <div className="populer-makes">
                        <div className="heading-section t-al-center mb-46">
                            <h2 className="title wow fadeInUp">
                                <FormattedMessage
                                    id={'recentlyAdded'}
                                    defaultMessage={'qdqw'}
                                />
                            </h2>
                        </div>
                        <PopularMakesTab1 />
                    </div>
                </div>
            </div>
        </>
    )
}
