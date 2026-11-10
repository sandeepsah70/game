import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export const FloatingCall: React.FC = () => {
  return (
    <div className="float-call-deck">
      <a
        href="https://wa.me/919916388000?text=Hi%2C%20I%20am%20looking%20for%20security%20guard%20services%20in%20Bangalore."
        target="_blank"
        rel="noreferrer"
        className="btn-float-action whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <a
        href="tel:+919916388000"
        className="btn-float-action call"
        title="Call 24/7 Helpline"
        aria-label="Call +91 99163 88000"
      >
        <Phone size={22} />
        <span className="call-floating-lbl">Call Us</span>
      </a>
    </div>
  )
}
