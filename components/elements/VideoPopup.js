'use client'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import "../../node_modules/react-modal-video/css/modal-video.css"
import Link from 'next/link'

export default function VideoPopup({ style }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            {style == 1 &&
                <a onClick={() => setOpen(false)} className="popup-youtube icon-video">
                    <i className="icon-Polygon-6" />
                </a>
            }
            {style == 2 &&
             <Link href="/car-list" className='popup-youtube btn-video ml-28'>
                    <i className="icon-right-arrow-2-1" />
                
                </Link>

            }
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="vfhzo499OeA" onClose={() => setOpen(false)} />


        </>
    )
}