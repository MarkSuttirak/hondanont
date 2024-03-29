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
import RewardsPage from './pages/points-rewards/rewards';
import ToRedeem from './pages/points-rewards/to-redeem';
import CouponRedemption from './pages/points-rewards/coupon-redemption';

import LoginPage from './pages/login/login';
import FillPhone from './pages/login/fill-phone';
import FillInfo from './pages/login/fill-info';
import Ready from './pages/login/ready';

import BlogAdmin from './pages/admin/blog-admin';
import BlogEdit from './pages/admin/blog-edit';
import BlogAdd from './pages/admin/blog-add';
import BlogView from './pages/admin/blog-view';
import BlogCate from './pages/admin/blog-cate/blog-categories';
import Blog from './pages/blog';
import TestEditor from './pages/admin/test-editor';
import BlogsFilteredByCate from './pages/admin/blog-cate/blog-cate';

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
          <Route path="/rewards" element={<RewardsPage />}/>
          <Route path="/to-redeem" element={<ToRedeem />}/>
          <Route path="/coupon-redemption" element={<CouponRedemption />}/>

          <Route path="/login" element={<LoginPage />}/>
          <Route path="/fill-phone" element={<FillPhone />}/>
          <Route path="/fill-info" element={<FillInfo />}/>
          <Route path="/ready" element={<Ready />}/>

          <Route path="/blog-admin" element={<BlogAdmin />}/>
          <Route path="/blog-edit/:id" element={<BlogEdit />}/>
          <Route path="/blog-view/:id" element={<BlogView />}/>
          <Route path="/blog-add" element={<BlogAdd />}/>
          <Route path="/blog-categories" element={<BlogCate />}/>
          <Route path="/blog-category/:id" element={<BlogsFilteredByCate />}/>

          <Route path="/blog/:id" element={<Blog />}/>

          <Route path="/test-editor" element={<TestEditor />}/>
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
