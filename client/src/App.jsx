import { Route, Routes } from "react-router-dom"
import "./App.scss"

import Header from "./components/Header"

// General pages
import Main from "./pages/Main"
import Contacts from "./pages/Contacts"

// Beers pages
import IndexBeers from "./pages/Beers/Index"
import CreateBeers from "./pages/Beers/Create"
import DetailsBeers from "./pages/Beers/Details"
import EditBeers from "./pages/Beers/Edit"
import DeleteBeers from "./pages/Beers/Delete"

// Breweries pages
import IndexBreweries from "./pages/Breweries/Index"
import CreateBreweries from "./pages/Breweries/Create"
import DetailsBreweries from "./pages/Breweries/Details"
import EditBreweries from "./pages/Breweries/Edit"

export const App = () => {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={ <Main /> } />
                <Route path="/contacts" element={ <Contacts /> } />

                <Route path="/beers" element={ <IndexBeers /> } />
                <Route path="/beers/create" element={ <CreateBeers /> } />
                <Route path="/beers/details/:id" element={ <DetailsBeers /> } />
                <Route path="/beers/edit/:id" element={ <EditBeers /> } />
                <Route path="/beers/delete/:id" element={ <DeleteBeers /> } />
                
                <Route path="/breweries" element={ <IndexBreweries /> } />
                <Route path="/breweries/create" element={ <CreateBreweries /> } />
                <Route path="/breweries/details/:id" element={ <DetailsBreweries /> } />
                <Route path="/breweries/edit/:id" element={ <EditBreweries /> } />
            </Routes>
        </>
    )
}

export default App
