"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ShoppingCart, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"

interface BuyModalProps {
  isOpen: boolean
  onClose: () => void
  creature: any
}

export function BuyModal({ isOpen, onClose, creature }: BuyModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)

  const gasFee = 0.003 // ETH
  const totalCost = Number.parseFloat(creature.price) + gasFee

  const handleBuy = async () => {
    setIsProcessing(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsPurchased(true)

    // Auto close after success
    setTimeout(() => {
      onClose()
      setIsPurchased(false)
    }, 2000)
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

  if (isPurchased) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
            <p className="text-white/70">{creature.name} has been added to your collection.</p>
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

          {/* Stats Preview */}
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-red-500/20 rounded p-2 text-center">
              <div className="text-red-400 font-medium">{creature.hp}</div>
              <div className="text-white/70">HP</div>
            </div>
            <div className="bg-blue-500/20 rounded p-2 text-center">
              <div className="text-blue-400 font-medium">{creature.speed}</div>
              <div className="text-white/70">Speed</div>
            </div>
            <div className="bg-purple-500/20 rounded p-2 text-center">
              <div className="text-purple-400 font-medium">{creature.skill}</div>
              <div className="text-white/70">Skill</div>
            </div>
            <div className="bg-yellow-500/20 rounded p-2 text-center">
              <div className="text-yellow-400 font-medium">{creature.morale}</div>
              <div className="text-white/70">Morale</div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Axie Price</span>
              <span>{creature.price} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Gas Fee (estimated)</span>
              <span className="text-yellow-400">{gasFee} ETH</span>
            </div>
            <Separator className="bg-white/20" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total Cost</span>
              <span className="text-cyan-400">{totalCost.toFixed(3)} ETH</span>
            </div>
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

          {/* Wallet Balance (Mock) */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-200">Wallet Balance</span>
              <span className="font-medium text-green-400">2.847 ETH</span>
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
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
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
