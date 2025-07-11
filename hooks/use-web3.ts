"use client"

import { useState, useEffect, useCallback } from 'react'
import { web3Service, type WalletConnection } from '@/lib/web3'
import { toast } from 'sonner'

export interface UseWeb3Return {
  isConnected: boolean
  address: string | null
  balance: string | null
  isLoading: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  buyAxie: (tokenId: number, price: string) => Promise<string | null>
  listAxie: (tokenId: number, price: string) => Promise<string | null>
  cancelListing: (tokenId: number) => Promise<string | null>
  getUserAxies: () => Promise<number[]>
  getGasEstimate: (tokenId: number, price: string) => Promise<string>
}

export function useWeb3(): UseWeb3Return {
  const [connection, setConnection] = useState<WalletConnection | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = useCallback(async () => {
    setIsLoading(true)
    try {
      const walletConnection = await web3Service.connectWallet()
      if (walletConnection) {
        setConnection(walletConnection)
        const walletBalance = await web3Service.getWalletBalance()
        setBalance(walletBalance)
        toast.success('Wallet connected successfully!')
      } else {
        toast.error('Failed to connect wallet')
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      toast.error('Failed to connect wallet. Please make sure MetaMask is installed.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setConnection(null)
    setBalance(null)
    web3Service.removeAllListeners()
    toast.info('Wallet disconnected')
  }, [])

  const buyAxie = useCallback(async (tokenId: number, price: string): Promise<string | null> => {
    if (!connection) {
      toast.error('Please connect your wallet first')
      return null
    }

    setIsLoading(true)
    try {
      const txHash = await web3Service.buyAxie(tokenId, price)
      toast.success('Axie purchased successfully!', {
        description: `Transaction: ${txHash.slice(0, 10)}...`
      })
      
      // Update balance after purchase
      const newBalance = await web3Service.getWalletBalance()
      setBalance(newBalance)
      
      return txHash
    } catch (error: any) {
      console.error('Buy error:', error)
      toast.error('Failed to purchase Axie', {
        description: error.message || 'Transaction failed'
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [connection])

  const listAxie = useCallback(async (tokenId: number, price: string): Promise<string | null> => {
    if (!connection) {
      toast.error('Please connect your wallet first')
      return null
    }

    setIsLoading(true)
    try {
      const txHash = await web3Service.listAxieForSale(tokenId, price)
      toast.success('Axie listed for sale!', {
        description: `Transaction: ${txHash.slice(0, 10)}...`
      })
      return txHash
    } catch (error: any) {
      console.error('List error:', error)
      toast.error('Failed to list Axie', {
        description: error.message || 'Transaction failed'
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [connection])

  const cancelListing = useCallback(async (tokenId: number): Promise<string | null> => {
    if (!connection) {
      toast.error('Please connect your wallet first')
      return null
    }

    setIsLoading(true)
    try {
      const txHash = await web3Service.cancelListing(tokenId)
      toast.success('Listing cancelled!', {
        description: `Transaction: ${txHash.slice(0, 10)}...`
      })
      return txHash
    } catch (error: any) {
      console.error('Cancel error:', error)
      toast.error('Failed to cancel listing', {
        description: error.message || 'Transaction failed'
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [connection])

  const getUserAxies = useCallback(async (): Promise<number[]> => {
    if (!connection) return []

    try {
      return await web3Service.getUserAxies(connection.address)
    } catch (error) {
      console.error('Failed to get user axies:', error)
      return []
    }
  }, [connection])

  const getGasEstimate = useCallback(async (tokenId: number, price: string): Promise<string> => {
    try {
      return await web3Service.estimateGasFee(tokenId, price)
    } catch (error) {
      console.error('Failed to estimate gas:', error)
      return "0.003"
    }
  }, [])

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            await connectWallet()
          }
        } catch (error) {
          console.error('Failed to check existing connection:', error)
        }
      }
    }

    checkConnection()
  }, [connectWallet])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else if (connection && accounts[0] !== connection.address) {
          // Account changed, reconnect
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [connection, connectWallet, disconnectWallet])

  return {
    isConnected: !!connection,
    address: connection?.address || null,
    balance,
    isLoading,
    connectWallet,
    disconnectWallet,
    buyAxie,
    listAxie,
    cancelListing,
    getUserAxies,
    getGasEstimate
  }
}