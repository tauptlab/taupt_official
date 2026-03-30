import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { Hero } from '@widgets/hero'
import { About } from '@widgets/about'
import { Work } from '@widgets/work'
import { Contact } from '@widgets/contact'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
