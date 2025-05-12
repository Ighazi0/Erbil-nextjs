"use client"
import Image from 'next/image';
import QRcodeinsta from "../../../public/assets/images/logo/qr-insta.svg";
import QRcodesnap from "../../../public/assets/images/logo/qr-snap.svg";
import QRcodetelegram from "../../../public/assets/images/logo/qr-telegram.svg";
import "./QRCodeSocialMedia.css";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FormattedMessage } from "react-intl"

const SocialMediaQRcode = [
    { name: <FormattedMessage id='Telegram' />, qr: QRcodetelegram, link: 'https://t.me/alqassim_cars', icon: <FaTelegramPlane /> },
    { name: <FormattedMessage id='Snapchat' />, qr: QRcodesnap, link: 'https://www.snapchat.com/add/alqassim.cars', icon: <FaSnapchatGhost /> },
    { name: <FormattedMessage id='Instagram' />, qr: QRcodeinsta, link: 'https://www.instagram.com/alqassim.cars/', icon: <FaInstagram /> },
];

const QRCodeSocialMedia = () => {
    return (
        <div className="bg-gradient p-5">
            <div className="heading-section t-al-center mb-30">
                <span className="sub-title mb-6 wow fadeInUp"><FormattedMessage id="Get the latest updates" /></span>
                <h2 className="title wow fadeInUp"><FormattedMessage id="All Social Accounts" /></h2>
            </div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    {SocialMediaQRcode.map((social, index) => (
                        <div key={index} className={`col-md-4 col-sm-6 col-12 mb-4 py-2`}>
                            <div className="card w-75 mx-auto shadow-lg border-0 rounded-4">
                                <div className="card-header text-white bg-danger text-center rounded-top d-flex align-items-center justify-content-center gap-2">
                                    <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                                    <h4 className="m-0">{social.name}</h4>
                                </div>
                                <a
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-body text-center"
                                >
                                    <Image
                                        src={social.qr.src}
                                        alt={`${social.name} QR Code`}
                                        width={200}
                                        height={200}
                                        className="img-fluid rounded-3"
                                    />
                                </a>
                                <div className="card-footer text-center bg-light rounded-bottom">
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-danger w-100 fw-bold"
                                        style={{ transition: '0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                                    >
                                        <FormattedMessage id='Visit' /> {social.name}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QRCodeSocialMedia;
