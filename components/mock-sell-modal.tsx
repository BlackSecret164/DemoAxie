"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, DollarSign } from "lucide-react"
import { useMockWeb3 } from "@/hooks/use-mock-web3"
import { useNFT } from "@/contexts/nft-context"
import { toast } from "sonner"
import Image from "next/image"

interface MockSellModalProps {
  isOpen: boolean
  onClose: () => void
  axie: any
}

export function MockSellModal({ isOpen, onClose, axie }: MockSellModalProps) {
  const { wallet, sellNFT } = useMockWeb3()
  const { listNFT } = useNFT()
  const [price, setPrice] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const marketplaceFee = 4.25 // 4.25%
  const priceNumber = parseFloat(price) || 0
  const feeAmount = (priceNumber * marketplaceFee) / 100
  const youReceive = priceNumber - feeAmount

  const handleSell = async () => {
    if (!price || priceNumber <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    if (!wallet.isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    setIsProcessing(true)

    try {
      const transaction = await sellNFT(axie.id, price)
      
      if (transaction) {
        // Update NFT listing
        listNFT(axie, price)
        onClose()
        setPrice("")
      }
    } catch (error) {
      console.error("Listing failed:", error)
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span>List Axie for Sale</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Axie Preview */}
          <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
            <Image
              src={axie.image || "/placeholder.svg"}
              alt={axie.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium">{axie.name}</h3>
              <Badge className={`${getClassColor(axie.class)} text-white text-xs mt-1`}>{axie.class}</Badge>
              <div className="text-sm text-white/70 mt-1">
                Breed: {axie.breed} • Purity: {axie.purity}/6
              </div>
            </div>
          </div>

          {/* Wallet Status */}
          {!wallet.isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-yellow-200">Please connect your wallet to continue</p>
              </div>
            </div>
          )}

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price">Sale Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.001"
              min="0.001"
              placeholder="0.000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <p className="text-xs text-white/60">Minimum price: 0.001 ETH</p>
          </div>

          {/* Fee Breakdown */}
          {priceNumber > 0 && (
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Sale Price</span>
                <span>{priceNumber.toFixed(3)} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Marketplace Fee ({marketplaceFee}%)</span>
                <span className="text-red-400">-{feeAmount.toFixed(3)} ETH</span>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex justify-between font-medium">
                <span>You will receive</span>
                <span className="text-green-400">{youReceive.toFixed(3)} ETH</span>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <p className="font-medium mb-1">Simulated NFT Listing</p>
              <p>
                This is a simulation of smart contract interaction. No real transaction fees apply.
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
              onClick={handleSell}
              disabled={!wallet.isConnected || !price || priceNumber <= 0 || isProcessing}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "List for Sale"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}