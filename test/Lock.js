const { expect } = require("chai");
const { ethers } = require("hardhat");

//we wait for information that beacause async
describe("NFTMarket", function () {
  it("Should mint and trade NFTs", async function () {
    //test to recive contract addresses
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    //test to receive listingPrice and auctionPrice
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    //test for minting

    await nft.mintToken("https-t1");
    await nft.mintToken("https-t2");

    await market.makeMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.makeMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    //test for different addresses from different users - test accounts
    //return an array of howevermany addresses

    const [_, buyerAddress] = await ethers.getSigners();

    //create market sale wirh address , id and price
    await market
      .connect(buyerAddress)
      .createMarketSales(nftContractAddress, 1, { value: auctionPrice });

    let items = await market.fetchMarketTokens();
    items = await Promise.all(
      items.map(async (i) => {
        //get uri of the value
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item={
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri
      
        }
        return item
      })
    );

    //test out all items
    console.log("items", items);
  });
});
