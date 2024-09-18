import { useState } from 'react'
import { CardsContainer } from './Cards-Container'
import { Header } from './Header'
import { CardsLibrary } from './Cards-Library'
import { Help } from './Help'
import { CardsProvider } from './CardsContext'


function App() {
  const [activeSection, setActiveSection] = useState("learn");



  function handleSectionChange(section: string) {
    setActiveSection(section)
  }

  return (
    <>
        <Header onSection={handleSectionChange} />
        <CardsProvider>
        {(activeSection === "learn") && (
            <CardsContainer />
          )
        }
        {(activeSection === "cards") && (
          <CardsLibrary />
        )
        }
        {(activeSection === "help") && (
          <Help />
        )
        }
        </CardsProvider>
    </>
  )
}

export default App
