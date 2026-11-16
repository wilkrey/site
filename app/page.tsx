import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { Process } from '@/components/site/process'
import { Services } from '@/components/site/services'
import { Studio } from '@/components/site/studio'
import { Work } from '@/components/site/work'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Studio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
