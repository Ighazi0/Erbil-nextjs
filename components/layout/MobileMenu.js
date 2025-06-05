"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";

export default function MobileMenu({ closeMenu }) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <ul className="navigation clearfix">
        <li className="dropdown2 current border-bottom px-2">
          <Link href="/" onClick={handleLinkClick}>
            <FormattedMessage id="home" />
          </Link>
        </li>
        <li className="dropdown2 px-2 border-bottom">
          <Link href="/car-list" onClick={handleLinkClick}>
            <FormattedMessage id="cars" />
          </Link>
        </li>
        <li className="dropdown2 px-2 border-bottom">
          <Link href="/about-us" onClick={handleLinkClick}>
            <FormattedMessage id="whoWeAre" />
          </Link>
        </li>
        <li className="dropdown2 px-2 border-bottom">
          <Link href="/contact-us" onClick={handleLinkClick}>
            <FormattedMessage id="contactUs" />
          </Link>
        </li>
      </ul>
    </>
  );
}
