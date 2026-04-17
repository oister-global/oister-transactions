"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/public/svg";
import Image from "next/image";
import { useState } from "react";

const contactData = [
  {
    heading: "Gurugram Office",
    address:
      "Level 6, Corporate Edge, Two Horizon Centre, Golf Course Road, Gurgaon, India, 122011",
    email: "support@oisterglobal.com",
    phone: "+91-8882137261",
  },
];

export default function Footer() {
  const items = [
    {
      Icon: LinkedinIcon,
      url: "https://www.linkedin.com/company/oisterglobal/mycompany/",
    },
    { Icon: TwitterIcon, url: "https://x.com/OisterGlobal" },
    { Icon: InstagramIcon, url: "https://www.instagram.com/oisterglobal/" },
    { Icon: FacebookIcon, url: "https://www.youtube.com/@OisterGlobal" },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <footer className="bg-[#28283d] p-10 grid grid-cols-2 justify-center items-center">
      <div className="col-span-1">
        <div className="flex flex-col gap-4 w-[224px]">
          <Image
            alt="oister-logo"
            src={"https://oistercdn.s3.ap-south-1.amazonaws.com/main-logo.svg"}
            width={224}
            height={66}
          />
          <div className="w-full flex justify-between px-4">
            {items.map(({ Icon, url }, index) => (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#36364D] ${
                  hoveredIndex === index
                    ? "cursor-pointer bg-[#6573E4] text-white"
                    : "bg-white text-[#6573E4]"
                }`}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-1 gap-8">
        {contactData.map(({ heading, address, email, phone }) => (
          <div
            key={heading}
            className="flex flex-col gap-3 text-[#F6F7F9] text-center"
          >
            <div className="text-base font-semibold">{heading}</div>
            <div className="text-sm opacity-90">{address}</div>
            <a
              className="text-sm wrap-break-word hover:underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <a
              className="text-sm wrap-break-word hover:underline"
              href={`tel:${phone.replace("-", "")}`}
            >
              {phone}
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}
