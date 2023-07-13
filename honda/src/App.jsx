import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage'
import PointCollection from './pages/pointCollection';
import Rewards from './pages/points-rewards/my-rewards';
import History from './pages/history/history';
import MyAccount from './pages/account/my-account';
import ConsentForDisclosure from './pages/account/consentForDisclosure';
import ExchangeRewards from './pages/account/exchangeRewards';
import MemberCondition from './pages/account/memberCondition';
import TermsAndConditions from './pages/account/termsAndConditions';
import Redemption from './pages/points-rewards/redemption';
import EditAccount from './pages/account/edit-account';

import LoginPage from './pages/login/login';

function App() {
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/point-collection" element={<PointCollection />} />
          <Route path="/" element={<LandingPage />}/>
          <Route path="/my-rewards" element={<Rewards />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/my-account" element={<MyAccount />}/>
          <Route path="/consent-for-disclosure" element={<ConsentForDisclosure />}/>
          <Route path="/exchange-rewards" element={<ExchangeRewards />}/>
          <Route path="/member-condition" element={<MemberCondition />}/>
          <Route path="/terms-and-conditions" element={<TermsAndConditions />}/>
          <Route path="/reward/:id" element={<Redemption />}/>
          <Route path="/edit-account" element={<EditAccount />}/>

          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
