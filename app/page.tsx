import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import Body from '@/components/sections/Body'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Body />
      <Footer />
    </main>
  );
}
