import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";
import Wallet from "./components/pages/wallet";
import Checkout from "./components/pages/checkout";
import TestNFT from "./components/pages/testNFT";
import BecomeDelegate from "./components/pages/becomeDelegate";
import { WelcomeClub } from "./components/pages/WelcomeClub";
import ConnectWalletContext from "./context/ConnectWalletContext";
import { ScrollToTop } from "./components/components/ScrollToTop";
import { MarketButton } from "./components/components/MarketButton";
import { CollectionClub } from "./components/pages/CollectionClub";
import { CollectionClubDetail } from "./components/pages/CollectionClubDetail";

function App() {
  return (
    <div className="App">
      <ConnectWalletContext>
        <MarketButton />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/testNFT" element={<TestNFT />} />
          <Route path="/welcome-to-club" element={<WelcomeClub />} />
          <Route path="/collecion-club/:collectionId" element={<CollectionClub />} />
          <Route path="/collecion-club-detail/:collectionId/:tokenId" element={<CollectionClubDetail />} />
          <Route path="/conviertete-en-delegado" element={<BecomeDelegate />} />
        </Routes>
      </ConnectWalletContext>
      <Footer />
    </div>
  );
}

export default App;
