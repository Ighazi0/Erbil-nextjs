'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from 'react'
import { FormattedMessage } from "react-intl"

export default function MobileMenu() {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <ul className="navigation clearfix">

                <li className="dropdown2 current border-bottom px-2">
                    <Link href="/"><FormattedMessage id="home" /></Link>
                </li>
                <li className="dropdown2 px-2 border-bottom">
                    <Link href="/car-list"><FormattedMessage id="cars" /></Link>

                </li>
                <li className="dropdown2 px-2 border-bottom ">
                    <Link href="/about-us">< FormattedMessage id="whoWeAre" /></Link>

                </li>
                <li className="dropdown2 px-2 border-bottom"><Link href="/contact-us">< FormattedMessage id="contactUs" /> </Link>
            
                </li>
            </ul>
        </>
    )
}
