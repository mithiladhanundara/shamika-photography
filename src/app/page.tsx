// src/app/page.tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Collection from '@/components/Collection'
import Testimonials from '@/components/Testimonials'
import Articles from '@/components/Articles'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Collection />
        <About />
        <Testimonials />
        <Articles />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}