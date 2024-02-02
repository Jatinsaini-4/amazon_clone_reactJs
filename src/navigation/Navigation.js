import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ROUTES from './Router'

function Navigation() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path={ROUTES.register.name}element={ROUTES.register.component}/>
            <Route path={ROUTES.about.name}element={ROUTES.about.component}/>
            <Route path={ROUTES.contact.name}element={ROUTES.contact.component}/>
            <Route path={ROUTES.customer.name}element={ROUTES.customer.component}/>
            <Route path={ROUTES.home.name}element={ROUTES.home.component}/>
            <Route path={ROUTES.login.name}element={ROUTES.login.component}/>
            <Route path={ROUTES.signup.name}element={ROUTES.signup.component}/>
            <Route path={ROUTES.product.name}element={ROUTES.product.component}/>
            <Route path={ROUTES.allMobile.name}element={ROUTES.allMobile.component}/>
            <Route path={ROUTES.allHomeKitchen.name}element={ROUTES.allHomeKitchen.component}/>
            <Route path={ROUTES.allElectronic.name}element={ROUTES.allElectronic.component}/>
            <Route path={ROUTES.allProducts.name}element={ROUTES.allProducts.component}/>
            <Route path={ROUTES.detail.name}element={ROUTES.detail.component}/>
            <Route path={ROUTES.SearchResult.name}element={ROUTES.SearchResult.component}/>
            <Route path={ROUTES.compareProducts.name}element={ROUTES.compareProducts.component}/>
            <Route path={ROUTES.Cart.name}element={ROUTES.Cart.component}/>
            <Route path={ROUTES.ProceedBuy.name}element={ROUTES.ProceedBuy.component}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Navigation