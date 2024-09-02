// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFT is ERC721, ERC721Pausable, Ownable, ERC721Burnable, ERC721Enumerable {
    uint256 private _nextTokenId;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address initialOwner)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner)
    {}

    // Pausable functions
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Mint new NFT
    function safeMint(address to, string memory tokenURI_) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
    }

    // Transfer NFT
    function transferNFT(address from, address to, uint256 tokenId) public onlyOwner {
        safeTransferFrom(from, to, tokenId);
    }

    // Internal function to set token URI
    function _setTokenURI(uint256 tokenId, string memory tokenURI_) internal {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = tokenURI_;
    }

    // Override the function to get token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    // Required for ERC721Enumerable
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Pausable, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
