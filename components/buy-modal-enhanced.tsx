"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ShoppingCart, CheckCircle, Loader2, ExternalLink } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"
import { toast } from "sonner"
import Image from "next/image"

interface BuyModalEnhancedProps {
  isOpen: boolean
  onClose: () => void
  creature: any
  onPurchaseSuccess?: (txHash: string) => void
}

export function BuyModalEnhanced({ isOpen, onClose, creature, onPurchaseSuccess }: BuyModalEnhancedProps) {
  const { isConnected, address, balance, buyAxie, getGasEstimate } = useWeb3()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [gasEstimate, setGasEstimate] = useState("0.003")
  const [txHash, setTxHash] = useState<string | null>(null)

  const totalCost = parseFloat(creature.price) + parseFloat(gasEstimate)
  const hasInsufficientFunds = balance ? parseFloat(balance) < totalCost : false

  useEffect(() => {
    if (isOpen && creature) {
      // Get gas estimate when modal opens
      getGasEstimate(creature.id, creature.price).then(setGasEstimate)
    }
  }, [isOpen, creature, getGasEstimate])

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (hasInsufficientFunds) {
      toast.error("Insufficient funds for this transaction")
      return
    }

    setIsProcessing(true)

    try {
      const transactionHash = await buyAxie(creature.id, creature.price)
      
      if (transactionHash) {
        setTxHash(transactionHash)
        setIsPurchased(true)
        onPurchaseSuccess?.(transactionHash)

        // Auto close after success
        setTimeout(() => {
          onClose()
          setIsPurchased(false)
          setTxHash(null)
        }, 3000)
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getClassColor = (className: string) => {
    const colors = {
      Beast: "bg-orange-500",
      Aquatic: "bg-blue-500",
      Plant: "bg-green-500",
      Bird: "bg-pink-500",
      Bug: "bg-red-500",
      Reptile: "bg-purple-500",
    }
    return colors[className as keyof typeof colors] || "bg-gray-500"
  }

  const getEtherscanUrl = (hash: string) => {
    return `https://etherscan.io/tx/${hash}`
  }

  if (isPurchased && txHash) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
            <p className="text-white/70 mb-4">{creature.name} has been added to your collection.</p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-sm text-white/70 mb-2">Transaction Hash:</p>
              <div className="flex items-center justify-center space-x-2">
                <code className="text-xs bg-white/10 px-2 py-1 rounded">
                  {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(getEtherscanUrl(txHash), '_blank')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <span>Purchase Axie</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creature Preview */}
          <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
            <Image
              src={creature.image || "/placeholder.svg"}
              alt={creature.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium">{creature.name}</h3>
              <Badge className={`${getClassColor(creature.class)} text-white text-xs mt-1`}>{creature.class}</Badge>
              <div className="text-sm text-white/70 mt-1">
                Breed: {creature.breed} • Purity: {creature.purity}/6
              </div>
            </div>
          </div>

          {/* Wallet Status */}
          {!isConnected ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-yellow-200">Please connect your wallet to continue</p>
              </div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-200">Wallet Balance</span>
                <span className="font-medium text-green-400">
                  {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "Loading..."}
                </span>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Axie Price</span>
              <span>{creature.price} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Gas Fee (estimated)</span>
              <span className="text-yellow-400">{gasEstimate} ETH</span>
            </div>
            <Separator className="bg-white/20" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total Cost</span>
              <span className={`${hasInsufficientFunds ? 'text-red-400' : 'text-cyan-400'}`}>
                {totalCost.toFixed(4)} ETH
              </span>
            </div>
            {hasInsufficientFunds && (
              <p className="text-red-400 text-xs mt-2">Insufficient funds for this transaction</p>
            )}
          </div>

          {/* Contract Info */}
          <div className="flex items-start space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">Smart Contract Purchase</p>
              <p>
                This transaction will interact with the Axie NFT contract to transfer ownership. The purchase is
                irreversible once confirmed.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBuy}
              disabled={!isConnected || isProcessing || hasInsufficientFunds}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}