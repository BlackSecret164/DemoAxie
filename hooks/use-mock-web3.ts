"use client"

import { useState, useCallback } from 'react'
import { mockWeb3Service, type MockWallet, type MockTransaction } from '@/lib/mock-web3'
import { toast } from 'sonner'

export interface UseMockWeb3Return {
  wallet: MockWallet
  isLoading: boolean
  transactions: MockTransaction[]
  contractInfo: any
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  buyNFT: (tokenId: number, price: string) => Promise<MockTransaction | null>
  sellNFT: (tokenId: number, price: string) => Promise<MockTransaction | null>
  cancelListing: (tokenId: number) => Promise<MockTransaction | null>
  estimateGas: () => Promise<string>
}

export function useMockWeb3(): UseMockWeb3Return {
  const [wallet, setWallet] = useState<MockWallet>(mockWeb3Service.getWallet())
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<MockTransaction[]>([])

  const connectWallet = useCallback(async () => {
    setIsLoading(true)
    try {
      const connectedWallet = await mockWeb3Service.connectWallet()
      setWallet(connectedWallet)
      toast.success('Wallet connected successfully!', {
        description: `Address: ${connectedWallet.address.slice(0, 10)}...`
      })
    } catch (error) {
      toast.error('Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    mockWeb3Service.disconnectWallet()
    setWallet(mockWeb3Service.getWallet())
    setTransactions([])
    toast.info('Wallet disconnected')
  }, [])

  const buyNFT = useCallback(async (tokenId: number, price: string): Promise<MockTransaction | null> => {
    setIsLoading(true)
    try {
      const transaction = await mockWeb3Service.buyNFT(tokenId, price)
      setWallet(mockWeb3Service.getWallet()) // Update balance
      setTransactions(mockWeb3Service.getTransactions())
      
      toast.success('NFT purchased successfully!', {
        description: `Transaction: ${transaction.hash.slice(0, 10)}...`
      })
      
      return transaction
    } catch (error: any) {
      toast.error('Purchase failed', {
        description: error.message
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sellNFT = useCallback(async (tokenId: number, price: string): Promise<MockTransaction | null> => {
    setIsLoading(true)
    try {
      const transaction = await mockWeb3Service.sellNFT(tokenId, price)
      setTransactions(mockWeb3Service.getTransactions())
      
      toast.success('NFT listed for sale!', {
        description: `Transaction: ${transaction.hash.slice(0, 10)}...`
      })
      
      return transaction
    } catch (error: any) {
      toast.error('Listing failed', {
        description: error.message
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const cancelListing = useCallback(async (tokenId: number): Promise<MockTransaction | null> => {
    setIsLoading(true)
    try {
      const transaction = await mockWeb3Service.cancelListing(tokenId)
      setTransactions(mockWeb3Service.getTransactions())
      
      toast.success('Listing cancelled!', {
        description: `Transaction: ${transaction.hash.slice(0, 10)}...`
      })
      
      return transaction
    } catch (error: any) {
      toast.error('Cancel failed', {
        description: error.message
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const estimateGas = useCallback(async (): Promise<string> => {
    return await mockWeb3Service.estimateGas()
  }, [])

  return {
    wallet,
    isLoading,
    transactions,
    contractInfo: mockWeb3Service.getContractInfo(),
    connectWallet,
    disconnectWallet,
    buyNFT,
    sellNFT,
    cancelListing,
    estimateGas
  }
}