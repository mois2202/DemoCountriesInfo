import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./Pages/Landing"
import RootLayout from "./Components/commons/RootLayout"

function App() {

   return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/countries" element={<Countries />} />
        <Route path="/country/:code" element={<CountryDetail />} />  */}
      </Routes>
    </RootLayout>


  )
}

export default App
