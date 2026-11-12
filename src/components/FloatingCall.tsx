import React from 'react'
import { FileText, Mail } from 'lucide-react'

export const FloatingCall: React.FC = () => {
  return (
    <div className="float-call-deck">
      <a
        href="./brochure/JTMS-Brochure.pdf"
        target="_blank"
        rel="noreferrer"
        className="btn-float-action call"
        title="Download JTMS Brochure"
        aria-label="Download JTMS Brochure"
      >
        <FileText size={22} />
        <span className="call-floating-lbl">Brochure</span>
      </a>

      <a
        href="mailto:info@jtmstech.in"
        className="btn-float-action whatsapp"
        title="Email JTMS Support"
        aria-label="Email info@jtmstech.in"
      >
        <Mail size={22} />
        <span className="call-floating-lbl">Email</span>
      </a>
    </div>
  )
}
