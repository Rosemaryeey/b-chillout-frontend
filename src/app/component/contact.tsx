
"use client";

import { FaFacebookF, FaTwitter, FaInstagram,FaTiktok } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-[var(--foreground)]">
      {/* Logo & About */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl text-[var(--color-highlight)]">🍴</span>
          <h3 className="text-2xl font-bold">Bamboo Chillout</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Your tropical escape for authentic Nigerian flavors and vibrant
          nightlife.
        </p>
        <div className="flex gap-4 text-2xl text-[var(--muted)]">
          <a href="#">
            <FaFacebookF className="hover:text-[var(--color-highlight)]" />
          </a>
          <a href="#">
            <FaTwitter className="hover:text-[var(--color-highlight)]" />
          </a>
          <a href="#">
            <FaInstagram className="hover:text-[var(--color-highlight)]" />
          </a>
          <a href="#">
            <FaTiktok className="hover:text-[var(--color-highlight)]" />
          </a>
        </div>
      </div>

      {/* Opening Hours */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
        <ul className="space-y-2 text-[var(--muted)]">
          <li>
            <span className="font-bold">Mon - Thu:</span> 9:00 PM - 10:00 PM
          </li>
          <li>
            <span className="font-bold">Fri - Sat:</span> 9:00 PM - 12:00 PM
          </li>
          <li>
            <span className="font-bold">Sunday:</span> 2:00 PM - 12:00 AM
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
        <ul className="space-y-3 text-[var(--muted)]">
          <li className="flex items-center gap-2">
            <MdLocationOn className="text-[var(--color-highlight)] text-3xl" />
            267 Aba Owerri Road, Abayi, Aba, Abia, Nigeria
          </li>
          <li className="flex items-center gap-2">
            <MdPhone className="text-[var(--color-highlight)] text-2xl" />
            +234 8037419758
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-[var(--color-highlight)] text-2xl" />
            bamboochillout@gmail.com
          </li>
        </ul>
      </div>

      {/* Location Map (Embed Google Map) */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Location</h4>
        <div className="w-full h-40 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7372292200544!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1b1b1b1b%3A0x123456789abcdef!2sLagos!5e0!3m2!1sen!2sng!4v1679999999999"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

