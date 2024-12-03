import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Game from "./pages/Game/Game";
import { useEffect } from "react";

import Arweave from "arweave";
function App() {
  async function initializeWallet() {
    let addressTemp = "";
    if (localStorage.getItem("wallet")) {
      const wallet = JSON.parse(localStorage.getItem("wallet"));
      addressTemp = localStorage.getItem("address");
      window.arweaveWallet = wallet;
      console.log("Wallet found in local storage", addressTemp);
    } else {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });

      const key = await arweave.wallets.generate();
      const addressGenerated = await arweave.wallets.jwkToAddress(key);


      localStorage.setItem("wallet", JSON.stringify(key));
      localStorage.setItem("address", addressGenerated);
      window.arweaveWallet = key;
      

      console.log("Wallet not found in local storage. Creating new waallet");
      console.log(key);
      console.log(addressGenerated);
    }
  }

  useEffect(() => {

    initializeWallet();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}
export default App;
