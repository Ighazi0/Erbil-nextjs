import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";

export default function Menu({ lang }) {
  const pathname = usePathname();

  return (
    <>
      <ul className="navigation clearfix">
        <li className={`${pathname === "/" ? "current" : ""}`}>
          <Link href="/#" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="home" />
          </Link>
        </li>
        <li className={`${pathname === "/car-list" ? "current" : ""}`}>
          <Link href="/car-list" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="cars" />
          </Link>
        </li>
        <li className={`${pathname === "/about-us" ? "current" : ""}`}>
          <Link href="/about-us" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="whoWeAre" />
          </Link>
        </li>
        <li className={`${pathname === "/contact-us" ? "current" : ""}`}>
          <Link href="/contact-us" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="contactUs" />{" "}
          </Link>
        </li>
      </ul>
    </>
  );
}
