import React from 'react'
import Header from './components/Header'
import ChatInterface from './components/ChatInterface'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import ScrollFillText from './components/ScrollFillText'

const page = () => {
  return (
      <main>
        <Header />
        <Hero />
        <ScrollFillText />
        <ChatInterface />
        <Features />
        <Pricing />
        <Footer />
      </main>
  )
}

export default page