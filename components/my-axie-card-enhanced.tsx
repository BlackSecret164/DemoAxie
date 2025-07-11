"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SellModal } from "@/components/sell-modal"
import { Swords, DollarSign, X, Star, Crown, Zap, Shield, Sword } from "lucide-react"
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

export function MyAxieCardEnhanced({ axie, onListForSale, onRemoveFromSale }: MyAxieCardProps) {
  const [showSellModal, setShowSellModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getClassColor = (className: string) => {
    const colors = {
      Beast: "from-orange-500 to-red-600",
      Aquatic: "from-blue-500 to-cyan-600",
      Plant: "from-green-500 to-emerald-600",
      Bird: "from-pink-500 to-purple-600",
      Bug: "from-red-500 to-pink-600",
      Reptile: "from-purple-500 to-indigo-600",
    }
    return colors[className as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const getClassIcon = (className: string) => {
    const icons = {
      Beast: <Sword className="w-3 h-3" />,
      Aquatic: <Shield className="w-3 h-3" />,
      Plant: <Shield className="w-3 h-3" />,
      Bird: <Zap className="w-3 h-3" />,
      Bug: <Sword className="w-3 h-3" />,
      Reptile: <Shield className="w-3 h-3" />,
    }
    return icons[className as keyof typeof icons] || <Star className="w-3 h-3" />
  }

  const level = Math.floor(axie.exp / 100) + 1
  const expToNextLevel = 100 - (axie.exp % 100)
  const totalStats = axie.hp + axie.speed + axie.skill + axie.morale

  return (
    <>
      <Card
        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Listed indicator */}
        {axie.isListed && (
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-1 text-xs font-medium">
              Listed for {axie.listedPrice} ETH
            </div>
          </div>
        )}

        {/* Animated background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getClassColor(axie.class)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <CardContent className={`p-4 relative z-10 ${axie.isListed ? "pt-8" : ""}`}>
          <div className="relative mb-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={axie.image || "/placeholder.svg"}
                alt={axie.name}
                width={300}
                height={300}
                className={`w-full h-48 object-cover transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />

              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Battle status and level */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8 backdrop-blur-sm"
                >
                  <Swords className="w-4 h-4" />
                </Button>
                {axie.lastBattleWon && (
                  <div className="bg-yellow-500 rounded-full p-1 animate-pulse">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Class badge */}
              <Badge
                className={`absolute top-2 left-2 bg-gradient-to-r ${getClassColor(axie.class)} text-white border-0 shadow-lg`}
              >
                <span className="flex items-center space-x-1">
                  {getClassIcon(axie.class)}
                  <span>{axie.class}</span>
                </span>
              </Badge>

              {/* Level badge */}
              <Badge className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-lg">
                Lv.{level}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium text-sm truncate group-hover:text-cyan-300 transition-colors">
                {axie.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <span>Breed: {axie.breed}</span>
                  <span>•</span>
                  <span>Purity: {axie.purity}/6</span>
                </div>
              </div>
            </div>

            {/* EXP Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>EXP to Lv.{level + 1}</span>
                <span>{expToNextLevel} EXP</span>
              </div>
              <Progress value={axie.exp % 100} className="h-2 bg-white/10" />
            </div>

            {/* Enhanced stats */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-red-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-red-400 font-medium">{axie.hp}</div>
                  <div className="text-white/70">HP</div>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-blue-400 font-medium">{axie.speed}</div>
                  <div className="text-white/70">Speed</div>
                </div>
              </div>
              <div className="bg-purple-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-purple-400 font-medium">{axie.skill}</div>
                  <div className="text-white/70">Skill</div>
                </div>
              </div>
              <div className="bg-yellow-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-yellow-400 font-medium">{axie.morale}</div>
                  <div className="text-white/70">Morale</div>
                </div>
              </div>
            </div>

            {/* Total stats indicator */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>Total Power</span>
                <span>{totalStats}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${getClassColor(axie.class)} transition-all duration-1000`}
                  style={{ width: `${Math.min((totalStats / 200) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
              {axie.isListed ? (
                <Button
                  onClick={() => onRemoveFromSale(axie.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove Sale
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSellModal(true)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              )}
              <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
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
