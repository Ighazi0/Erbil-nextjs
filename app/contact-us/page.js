"use client";
import Layout from "@/components/layout/Layout";
import { FormattedMessage, useIntl } from "react-intl";
import { Mail, PhoneCall, MapPin } from "lucide-react";

export default function ContactUs() {
  const intl = useIntl();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      {/* wrapper */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="themesflat-container max-w-6xl mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {/* Phone */}
            <div className="contact-us-box bg-gray-50 rounded-2xl shadow p-6 flex gap-4 mb-8 md:mb-0 md:last:mb-0">
              <div className="icon bg-primary/10 dark:bg-primary/20 rounded-full p-3">
                <PhoneCall className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <FormattedMessage id="Phone Number" />
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-7">
                  +971 50 135 7705 <br />
                  +971 52 539 6339 <br />
                  +964 750 447 2923 <br />
                  +964 750 445 7705
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-us-box bg-gray-50 rounded-2xl shadow p-6 flex gap-4 mb-8 md:mb-0 md:last:mb-0">
              <div className="icon bg-primary/10 dark:bg-primary/20 rounded-full p-3">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <FormattedMessage id="Email" defaultMessage="Email" />
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <a
                    href="mailto:info@erbilcarrental.net"
                    className="hover:underline"
                  >
                    info@erbilcarrental.net
                  </a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="contact-us-box bg-gray-50 rounded-2xl shadow p-6 flex gap-4 md:col-span-2">
              <div className="icon bg-primary/10 dark:bg-primary/20 rounded-full p-3">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <FormattedMessage id="Address line" />
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-7">
                  Auto Center | Enoc | 33 | Deira, Dubai | Behind Al Habtoor Motor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
