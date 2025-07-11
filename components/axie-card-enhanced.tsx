"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuyModal } from "@/components/buy-modal"
import { Heart, Eye, Zap, Shield, Sword, Star } from "lucide-react"
import Image from "next/image"

interface Creature {
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
}

interface CreatureCardProps {
  creature: Creature
}

export function AxieCardEnhanced({ creature }: CreatureCardProps) {
  const [showBuyModal, setShowBuyModal] = useState(false)
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

  const totalStats = creature.hp + creature.speed + creature.skill + creature.morale
  const rarityLevel = totalStats > 180 ? "Legendary" : totalStats > 160 ? "Epic" : totalStats > 140 ? "Rare" : "Common"

  return (
    <>
      <Card
        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getClassColor(creature.class)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Rarity glow effect */}
        {rarityLevel === "Legendary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
        )}

        <CardContent className="p-4 relative z-10">
          <div className="relative mb-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={creature.image || "/placeholder.svg"}
                alt={creature.name}
                width={300}
                height={300}
                className={`w-full h-48 object-cover transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating action buttons */}
              <div
                className={`absolute top-2 right-2 flex flex-col space-y-1 transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-x-0" : "opacity-70 translate-x-2"
                }`}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8 backdrop-blur-sm"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8 backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              {/* Class badge with icon */}
              <Badge
                className={`absolute top-2 left-2 bg-gradient-to-r ${getClassColor(creature.class)} text-white border-0 shadow-lg`}
              >
                <span className="flex items-center space-x-1">
                  {getClassIcon(creature.class)}
                  <span>{creature.class}</span>
                </span>
              </Badge>

              {/* Rarity badge */}
              <Badge
                className={`absolute bottom-2 right-2 ${
                  rarityLevel === "Legendary"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : rarityLevel === "Epic"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : rarityLevel === "Rare"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-gray-500 to-gray-600"
                } text-white border-0 shadow-lg text-xs`}
              >
                {rarityLevel}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium text-sm truncate group-hover:text-cyan-300 transition-colors">
                {creature.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-cyan-400 font-bold text-lg group-hover:text-cyan-300 transition-colors">
                  {creature.price} ETH
                </span>
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <span>Breed: {creature.breed}</span>
                  <span>•</span>
                  <span>Purity: {creature.purity}/6</span>
                </div>
              </div>
            </div>

            {/* Enhanced stats with animations */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-red-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-red-400 font-medium">{creature.hp}</div>
                  <div className="text-white/70">HP</div>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-blue-400 font-medium">{creature.speed}</div>
                  <div className="text-white/70">Speed</div>
                </div>
              </div>
              <div className="bg-purple-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-purple-400 font-medium">{creature.skill}</div>
                  <div className="text-white/70">Skill</div>
                </div>
              </div>
              <div className="bg-yellow-500/20 rounded p-2 text-center relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-yellow-400 font-medium">{creature.morale}</div>
                  <div className="text-white/70">Morale</div>
                </div>
              </div>
            </div>

            {/* Total stats bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>Total Stats</span>
                <span>{totalStats}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${getClassColor(creature.class)} transition-all duration-1000`}
                  style={{ width: `${Math.min((totalStats / 200) * 100, 100)}%` }}
                />
              </div>
            </div>

            <Button
              onClick={() => setShowBuyModal(true)}
              className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25`}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Buy Now</span>
                {isHovered && <Zap className="w-4 h-4 animate-pulse" />}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <BuyModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} creature={creature} />
    </>
  )
}
