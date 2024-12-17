'use client'

import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import WorkTogether from '@/components/sections/WorkTogether'
import Footer from '@/components/sections/Footer'
import Project from '@/components/sections/Project'
import UIDesign from '@/components/sections/UIDesign'
import Playground from '@/components/sections/Playground'
import Section from '@/components/sections/Section'

export default function Home() {
  return (
    <main className="relative">
      <Section>
        <Hero />
      </Section>
      <Section isDark>
        <AboutMe />
      </Section>
      <Project 
        title="Decent"
        description="A decentralized content platform built on Arweave. Built with Next.js, TypeScript, and Tailwind."
        imageSrc="/portfolio/decent_app--hero.png"
        imageAlt="Decent App"
        index={0}
      />
      <Project 
        title="Blockset Docs"
        description="Documentation platform for Blockset's blockchain infrastructure APIs."
        imageSrc="/portfolio/blockset_docs--hero.png"
        imageAlt="Blockset Documentation"
        inverted
        index={1}
      />
      <Project 
        title="Frostbyte"
        description="NFT marketplace with integrated scanning tools for fraud detection."
        imageSrc="/portfolio/frostbyte_scan--product1.png"
        imageAlt="Frostbyte NFT Scanner"
        index={2}
      />
      <Project 
        title="Sarcophagus"
        description="Dead man's switch for the decentralized web. Built with React and Web3 technologies."
        imageSrc="/portfolio/sarcophagus_app--product1.png"
        imageAlt="Sarcophagus dApp"
        inverted
        index={3}
      />
      <Project 
        title="Decent Design System"
        description="A comprehensive design system for decentralized applications."
        imageSrc="/portfolio/decent_ds--hero.png"
        imageAlt="Decent Design System"
        index={4}
      />
      <UIDesign />
      <Playground />
      <WorkTogether />
      <Footer />
    </main>
  )
}
