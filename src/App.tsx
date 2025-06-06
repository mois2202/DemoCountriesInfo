import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./Pages/Landing"
import { CountriesPage } from "./Pages/Contries"
import RootLayout from "./Components/commons/RootLayout"
import { CountryDetailPage } from "./Pages/CountryDetailPage"

function App() {

   return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:code" element={<CountryDetailPage />} />
      </Routes>
    </RootLayout>

  )
}

export default App
