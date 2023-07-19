import '../styles/globals.css';
import './app.css';

import 'tailwindcss/tailwind.css';
import Link from "next/link";

function NFTMarketplace({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6" style={{ backgroundColor: "cadetblue" ,color:"white"}}>
        <p className="text-4x1 font-bold text text-xl" >NFT Marketplace</p>
        <div className="flex mt-4 justify">
          <Link href="/" legacyBehavior>
            <a className="mr-4">Main Marketplace</a>
          </Link>
          <Link href="/mint-item" legacyBehavior>
            <a className="mr-6">Mint Tokens</a>
          </Link>
          <Link href="/my-nfts" legacyBehavior>
            <a className="mr-6">My NFTs</a>
          </Link>
          <Link href="/account-dashboard" legacyBehavior>
            <a className="mr-6">Account Dashboard</a>
          </Link>
         
        </div>
      </nav>
      <Component {...pageProps}></Component>
    </div>
  );
}

export default NFTMarketplace;