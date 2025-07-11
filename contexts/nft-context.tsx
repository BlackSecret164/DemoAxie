"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface NFT {
  id: number
  name: string
  image: string
  price: string
  class: string
  hp: number
  speed: number
  skill: number
  morale: number
  breed: string
  purity: number
  owner?: string
  isListed?: boolean
  listedPrice?: string
}

interface NFTContextType {
  marketplaceNFTs: NFT[]
  userNFTs: NFT[]
  purchaseNFT: (nftId: number, userAddress: string) => void
  listNFT: (nft: NFT, price: string) => void
  removeFromMarketplace: (nftId: number) => void
  cancelListing: (nftId: number) => void
}

const NFTContext = createContext<NFTContextType | undefined>(undefined)

const initialMarketplaceNFTs: NFT[] = [
  {
    id: 1,
    name: "Mystic Guardian #4521",
    image: "/placeholder.svg",
    price: "0.045",
    class: "Beast",
    hp: 57,
    speed: 35,
    skill: 31,
    morale: 44,
    breed: "2/7",
    purity: 6,
    isListed: true
  },
  {
    id: 2,
    name: "Aqua Warrior #7832",
    image: "/placeholder.svg",
    price: "0.032",
    class: "Aquatic",
    hp: 59,
    speed: 39,
    skill: 35,
    morale: 27,
    breed: "0/7",
    purity: 5,
    isListed: true
  },
  {
    id: 3,
    name: "Plant Defender #2156",
    image: "/placeholder.svg",
    price: "0.028",
    class: "Plant",
    hp: 61,
    speed: 31,
    skill: 31,
    morale: 41,
    breed: "1/7",
    purity: 6,
    isListed: true
  },
  {
    id: 4,
    name: "Bird Striker #9043",
    image: "/placeholder.svg",
    price: "0.055",
    class: "Bird",
    hp: 27,
    speed: 67,
    skill: 35,
    morale: 35,
    breed: "3/7",
    purity: 4,
    isListed: true
  },
  {
    id: 5,
    name: "Bug Assassin #6721",
    image: "/placeholder.svg",
    price: "0.041",
    class: "Bug",
    hp: 35,
    speed: 42,
    skill: 35,
    morale: 52,
    breed: "2/7",
    purity: 5,
    isListed: true
  },
  {
    id: 6,
    name: "Reptile Tank #3498",
    image: "/placeholder.svg",
    price: "0.037",
    class: "Reptile",
    hp: 59,
    speed: 31,
    skill: 31,
    morale: 43,
    breed: "1/7",
    purity: 6,
    isListed: true
  }
]

export function NFTProvider({ children }: { children: React.ReactNode }) {
  const [marketplaceNFTs, setMarketplaceNFTs] = useState<NFT[]>(initialMarketplaceNFTs)
  const [userNFTs, setUserNFTs] = useState<NFT[]>([])

  const purchaseNFT = useCallback((nftId: number, userAddress: string) => {
    const nft = marketplaceNFTs.find(n => n.id === nftId)
    if (!nft) return

    // Remove from marketplace
    setMarketplaceNFTs(prev => prev.filter(n => n.id !== nftId))
    
    // Add to user's collection
    const ownedNFT: NFT = {
      ...nft,
      owner: userAddress,
      isListed: false,
      listedPrice: undefined
    }
    
    setUserNFTs(prev => [...prev, ownedNFT])
  }, [marketplaceNFTs])

  const listNFT = useCallback((nft: NFT, price: string) => {
    // Remove from user's collection
    setUserNFTs(prev => prev.filter(n => n.id !== nft.id))
    
    // Add to marketplace
    const listedNFT: NFT = {
      ...nft,
      price,
      isListed: true,
      listedPrice: price
    }
    
    setMarketplaceNFTs(prev => [...prev, listedNFT])
  }, [])

  const removeFromMarketplace = useCallback((nftId: number) => {
    setMarketplaceNFTs(prev => prev.filter(n => n.id !== nftId))
  }, [])

  const cancelListing = useCallback((nftId: number) => {
    const nft = marketplaceNFTs.find(n => n.id === nftId)
    if (!nft) return

    // Remove from marketplace
    setMarketplaceNFTs(prev => prev.filter(n => n.id !== nftId))
    
    // Add back to user's collection
    const ownedNFT: NFT = {
      ...nft,
      isListed: false,
      listedPrice: undefined
    }
    
    setUserNFTs(prev => [...prev, ownedNFT])
  }, [marketplaceNFTs])

  return (
    <NFTContext.Provider value={{
      marketplaceNFTs,
      userNFTs,
      purchaseNFT,
      listNFT,
      removeFromMarketplace,
      cancelListing
    }}>
      {children}
    </NFTContext.Provider>
  )
}

export function useNFT() {
  const context = useContext(NFTContext)
  if (context === undefined) {
    throw new Error('useNFT must be used within an NFTProvider')
  }
  return context
}