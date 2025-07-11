"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SellModal } from "@/components/sell-modal"
import { Swords, DollarSign, X, Star } from "lucide-react"
import Image from "next/image"

interface MyAxie {
  id: number
  name: string
  image: string
  class: string
  hp: number
  speed: number
  skill: number
  morale: number
  breed: string
  purity: number
  isListed: boolean
  listedPrice: string | null
  lastBattleWon: boolean
  exp: number
}

interface MyAxieCardProps {
  axie: MyAxie
  onListForSale: (axieId: number, price: string) => void
  onRemoveFromSale: (axieId: number) => void
}

export function MyAxieCard({ axie, onListForSale, onRemoveFromSale }: MyAxieCardProps) {
  const [showSellModal, setShowSellModal] = useState(false)

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

  const level = Math.floor(axie.exp / 100) + 1
  const expToNextLevel = 100 - (axie.exp % 100)

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group relative">
        {axie.isListed && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-green-500 text-white">Listed for {axie.listedPrice} ETH</Badge>
          </div>
        )}

        <CardContent className="p-4">
          <div className="relative mb-4">
            <Image
              src={axie.image || "/placeholder.svg"}
              alt={axie.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8">
                <Swords className="w-4 h-4" />
              </Button>
              {axie.lastBattleWon && (
                <div className="bg-yellow-500 rounded-full p-1">
                  <Star className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <Badge className={`absolute bottom-2 left-2 ${getClassColor(axie.class)} text-white`}>{axie.class}</Badge>
            <Badge className="absolute bottom-2 right-2 bg-purple-600 text-white">Lv.{level}</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium text-sm truncate">{axie.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <span>Breed: {axie.breed}</span>
                  <span>•</span>
                  <span>Purity: {axie.purity}/6</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>EXP</span>
                <span>
                  {axie.exp} / {level * 100}
                </span>
              </div>
              <Progress value={axie.exp % 100} className="h-2" />
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-red-500/20 rounded p-2 text-center">
                <div className="text-red-400 font-medium">{axie.hp}</div>
                <div className="text-white/70">HP</div>
              </div>
              <div className="bg-blue-500/20 rounded p-2 text-center">
                <div className="text-blue-400 font-medium">{axie.speed}</div>
                <div className="text-white/70">Speed</div>
              </div>
              <div className="bg-purple-500/20 rounded p-2 text-center">
                <div className="text-purple-400 font-medium">{axie.skill}</div>
                <div className="text-white/70">Skill</div>
              </div>
              <div className="bg-yellow-500/20 rounded p-2 text-center">
                <div className="text-yellow-400 font-medium">{axie.morale}</div>
                <div className="text-white/70">Morale</div>
              </div>
            </div>

            <div className="flex space-x-2">
              {axie.isListed ? (
                <Button onClick={() => onRemoveFromSale(axie.id)} className="flex-1 bg-red-600 hover:bg-red-700">
                  <X className="w-4 h-4 mr-2" />
                  Remove Sale
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSellModal(true)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              )}
              <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                <Swords className="w-4 h-4 mr-2" />
                Battle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <SellModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
        axie={axie}
        onConfirmSale={onListForSale}
      />
    </>
  )
}
