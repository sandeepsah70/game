import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { QuoteForm } from './components/QuoteForm'
import { ServicesSection } from './components/ServicesSection'
import { WhyUsSection } from './components/WhyUsSection'
import { StatsSection } from './components/StatsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ServiceAreasSection } from './components/ServiceAreasSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { FloatingCall } from './components/FloatingCall'
import './App.css'

export default function App() {
  const handleOpenQuote = () => {
    const el = document.getElementById('risk')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="blr-site-root">
      <Navbar onOpenQuote={handleOpenQuote} />
      <main>
        <HeroSection onOpenQuote={handleOpenQuote} />
        <QuoteForm />
        <ServicesSection onOpenQuote={handleOpenQuote} />
        <WhyUsSection onOpenQuote={handleOpenQuote} />
        <StatsSection />
        <TestimonialsSection />
        <ServiceAreasSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCall />
    </div>
  )
}
