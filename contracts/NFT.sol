//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


//storung uri and minting tokens
contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    //OBJ: give the NFT ability to transact with tokens or change ownership
    //setApprovalForAll allows us to do that with contract address

    constructor(address marketplaceAddress) ERC721("NFT-Marketplace", "NFTM") {
        contractAddress = marketplaceAddress;
    }
    
    function mintToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        //passing an id and url
        _mint(msg.sender, newItemId);
        //set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
        //give the marketplace the approval to transact between users
        setApprovalForAll(contractAddress, true);
        //mint the token and set it for sale -return id to do so

        return newItemId;
    }
}
