import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from "./Layout.jsx";
import LoadingSpinner from '@/components/LoadingSpinner';

// Eager load critical pages
import Home from "./Home";
import NotFound from "./NotFound";

// Lazy load all other pages for better performance
const About = lazy(() => import("./About"));
const Services = lazy(() => import("./Services"));
const CaseStudies = lazy(() => import("./CaseStudies"));
const Blog = lazy(() => import("./Blog"));
const Contact = lazy(() => import("./Contact"));
const Schedule = lazy(() => import("./Schedule"));
const Admin = lazy(() => import("./Admin"));
const ApproveRequest = lazy(() => import("./ApproveRequest"));
const App = lazy(() => import("./App"));
const _app = lazy(() => import("./_app"));
const AITools = lazy(() => import("./AITools"));
const Subscription = lazy(() => import("./Subscription"));
const AIToolsList = lazy(() => import("./AIToolsList"));
const AIToolDetails = lazy(() => import("./AIToolDetails"));
const Shop = lazy(() => import("./Shop"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout"));
const TermsOfService = lazy(() => import("./TermsOfService"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./RefundPolicy"));
const ShippingPolicy = lazy(() => import("./ShippingPolicy"));
const FAQ = lazy(() => import("./FAQ"));
const Dashboard = lazy(() => import("./Dashboard"));
const Deals = lazy(() => import("./Deals"));
const OrderConfirmation = lazy(() => import("./OrderConfirmation"));
const Downloads = lazy(() => import("./Downloads"));
const MyAccount = lazy(() => import("./MyAccount"));
const Bundles = lazy(() => import("./Bundles"));
const Reviews = lazy(() => import("./Reviews"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

const PAGES = {
    
    Home: Home,
    
    About: About,
    
    Services: Services,
    
    CaseStudies: CaseStudies,
    
    Blog: Blog,
    
    Contact: Contact,
    
    Schedule: Schedule,
    
    Admin: Admin,
    
    ApproveRequest: ApproveRequest,
    
    App: App,
    
    _app: _app,
    
    AITools: AITools,
    
    Subscription: Subscription,
    
    AIToolsList: AIToolsList,
    
    AIToolDetails: AIToolDetails,
    
    Shop: Shop,
    
    ProductDetails: ProductDetails,
    
    Cart: Cart,
    
    Checkout: Checkout,
    
    TermsOfService: TermsOfService,
    
    PrivacyPolicy: PrivacyPolicy,
    
    RefundPolicy: RefundPolicy,
    
    ShippingPolicy: ShippingPolicy,
    
    FAQ: FAQ,
    
    Dashboard: Dashboard,
    
    Deals: Deals,
    
    OrderConfirmation: OrderConfirmation,
    
    NotFound: NotFound,
    
    Downloads: Downloads,
    
    MyAccount: MyAccount,
    
    Bundles: Bundles,
    
    Reviews: Reviews,
    
    Login: Login,
    
    Register: Register,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context  
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Suspense fallback={<LoadingSpinner fullScreen text="טוען דף..." />}>
              <Routes>            
                {/* Home - default route */}
                <Route path="/" element={<Home />} />
                
                {/* Main pages - lowercase URLs */}
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/casestudies" element={<CaseStudies />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/schedule" element={<Schedule />} />
                
                {/* Admin & Management */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/approverequest" element={<ApproveRequest />} />
                <Route path="/app" element={<App />} />
                <Route path="/_app" element={<_app />} />
                
                {/* AI Tools */}
                <Route path="/aitools" element={<AITools />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/aitoolslist" element={<AIToolsList />} />
                <Route path="/aitooldetails" element={<AIToolDetails />} />
                
                {/* Shop & E-commerce */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/bundles" element={<Bundles />} />
                <Route path="/orderconfirmation" element={<OrderConfirmation />} />
                
                {/* User Account */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Legal & Support */}
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/refundpolicy" element={<RefundPolicy />} />
                <Route path="/shippingpolicy" element={<ShippingPolicy />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* 404 - catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}