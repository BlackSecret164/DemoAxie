import { ethers } from 'ethers'

// Axie NFT Contract ABI (simplified)
const AXIE_CONTRACT_ABI = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function approve(address to, uint256 tokenId)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
]

// Marketplace Contract ABI (simplified)
const MARKETPLACE_CONTRACT_ABI = [
  "function listAxie(uint256 tokenId, uint256 price)",
  "function buyAxie(uint256 tokenId) payable",
  "function cancelListing(uint256 tokenId)",
  "function getListingPrice(uint256 tokenId) view returns (uint256)",
  "function isListed(uint256 tokenId) view returns (bool)",
  "event AxieListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event AxieSold(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price)"
]

// Contract addresses (replace with actual addresses)
export const AXIE_CONTRACT_ADDRESS = "0x32950db2a7164aE833121501C797D79E7B79d74C" // Axie Infinity contract
export const MARKETPLACE_CONTRACT_ADDRESS = "0x..." // Your marketplace contract

export interface WalletConnection {
  address: string
  provider: ethers.BrowserProvider
  signer: ethers.Signer
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.Signer | null = null
  private axieContract: ethers.Contract | null = null
  private marketplaceContract: ethers.Contract | null = null

  async connectWallet(): Promise<WalletConnection | null> {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask is not installed')
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      this.provider = new ethers.BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()
      const address = await this.signer.getAddress()

      // Initialize contracts
      this.axieContract = new ethers.Contract(
        AXIE_CONTRACT_ADDRESS,
        AXIE_CONTRACT_ABI,
        this.signer
      )

      this.marketplaceContract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        MARKETPLACE_CONTRACT_ABI,
        this.signer
      )

      return {
        address,
        provider: this.provider,
        signer: this.signer
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      return null
    }
  }

  async getWalletBalance(): Promise<string> {
    if (!this.provider || !this.signer) {
      throw new Error('Wallet not connected')
    }

    const balance = await this.provider.getBalance(await this.signer.getAddress())
    return ethers.formatEther(balance)
  }

  async getUserAxies(userAddress: string): Promise<number[]> {
    if (!this.axieContract) {
      throw new Error('Contract not initialized')
    }

    try {
      const balance = await this.axieContract.balanceOf(userAddress)
      const tokenIds: number[] = []

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await this.axieContract.tokenOfOwnerByIndex(userAddress, i)
        tokenIds.push(Number(tokenId))
      }

      return tokenIds
    } catch (error) {
      console.error('Failed to get user axies:', error)
      return []
    }
  }

  async listAxieForSale(tokenId: number, priceInEth: string): Promise<string> {
    if (!this.axieContract || !this.marketplaceContract || !this.signer) {
      throw new Error('Contracts not initialized')
    }

    try {
      const userAddress = await this.signer.getAddress()
      const priceInWei = ethers.parseEther(priceInEth)

      // Check if user owns the Axie
      const owner = await this.axieContract.ownerOf(tokenId)
      if (owner.toLowerCase() !== userAddress.toLowerCase()) {
        throw new Error('You do not own this Axie')
      }

      // Approve marketplace to transfer the Axie
      const approveTx = await this.axieContract.approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
      await approveTx.wait()

      // List the Axie on marketplace
      const listTx = await this.marketplaceContract.listAxie(tokenId, priceInWei)
      const receipt = await listTx.wait()

      return receipt.hash
    } catch (error) {
      console.error('Failed to list Axie:', error)
      throw error
    }
  }

  async buyAxie(tokenId: number, priceInEth: string): Promise<string> {
    if (!this.marketplaceContract) {
      throw new Error('Marketplace contract not initialized')
    }

    try {
      const priceInWei = ethers.parseEther(priceInEth)

      // Check if Axie is still listed
      const isListed = await this.marketplaceContract.isListed(tokenId)
      if (!isListed) {
        throw new Error('This Axie is no longer available')
      }

      // Get current listing price
      const currentPrice = await this.marketplaceContract.getListingPrice(tokenId)
      if (currentPrice !== priceInWei) {
        throw new Error('Price has changed')
      }

      // Buy the Axie
      const buyTx = await this.marketplaceContract.buyAxie(tokenId, {
        value: priceInWei
      })
      const receipt = await buyTx.wait()

      return receipt.hash
    } catch (error) {
      console.error('Failed to buy Axie:', error)
      throw error
    }
  }

  async cancelListing(tokenId: number): Promise<string> {
    if (!this.marketplaceContract || !this.signer) {
      throw new Error('Contracts not initialized')
    }

    try {
      const cancelTx = await this.marketplaceContract.cancelListing(tokenId)
      const receipt = await cancelTx.wait()

      return receipt.hash
    } catch (error) {
      console.error('Failed to cancel listing:', error)
      throw error
    }
  }

  async estimateGasFee(tokenId: number, priceInEth: string): Promise<string> {
    if (!this.marketplaceContract || !this.provider) {
      throw new Error('Contracts not initialized')
    }

    try {
      const priceInWei = ethers.parseEther(priceInEth)
      const gasEstimate = await this.marketplaceContract.buyAxie.estimateGas(tokenId, {
        value: priceInWei
      })

      const feeData = await this.provider.getFeeData()
      const gasCost = gasEstimate * (feeData.gasPrice || BigInt(0))

      return ethers.formatEther(gasCost)
    } catch (error) {
      console.error('Failed to estimate gas:', error)
      return "0.003" // Fallback estimate
    }
  }

  async getAxieListingInfo(tokenId: number): Promise<{
    isListed: boolean
    price?: string
    seller?: string
  }> {
    if (!this.marketplaceContract) {
      throw new Error('Marketplace contract not initialized')
    }

    try {
      const isListed = await this.marketplaceContract.isListed(tokenId)
      
      if (!isListed) {
        return { isListed: false }
      }

      const price = await this.marketplaceContract.getListingPrice(tokenId)
      
      return {
        isListed: true,
        price: ethers.formatEther(price)
      }
    } catch (error) {
      console.error('Failed to get listing info:', error)
      return { isListed: false }
    }
  }

  // Listen to contract events
  onAxieListed(callback: (tokenId: number, seller: string, price: string) => void) {
    if (!this.marketplaceContract) return

    this.marketplaceContract.on('AxieListed', (tokenId, seller, price) => {
      callback(Number(tokenId), seller, ethers.formatEther(price))
    })
  }

  onAxieSold(callback: (tokenId: number, buyer: string, seller: string, price: string) => void) {
    if (!this.marketplaceContract) return

    this.marketplaceContract.on('AxieSold', (tokenId, buyer, seller, price) => {
      callback(Number(tokenId), buyer, seller, ethers.formatEther(price))
    })
  }

  // Cleanup
  removeAllListeners() {
    if (this.marketplaceContract) {
      this.marketplaceContract.removeAllListeners()
    }
    if (this.axieContract) {
      this.axieContract.removeAllListeners()
    }
  }
}

// Global instance
export const web3Service = new Web3Service()

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}