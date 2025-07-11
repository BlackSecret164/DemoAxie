"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuyModal } from "@/components/buy-modal"
import { Heart, Eye } from "lucide-react"
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

export function CreatureCard({ creature }: CreatureCardProps) {
  const [showBuyModal, setShowBuyModal] = useState(false)

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
    <>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Image
              src={creature.image || "/placeholder.svg"}
              alt={creature.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            <Badge className={`absolute top-2 left-2 ${getClassColor(creature.class)} text-white`}>
              {creature.class}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium text-sm truncate">{creature.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-cyan-400 font-bold text-lg">{creature.price} ETH</span>
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <span>Breed: {creature.breed}</span>
                  <span>•</span>
                  <span>Purity: {creature.purity}/6</span>
                </div>
              </div>
            </div>

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

            <Button
              onClick={() => setShowBuyModal(true)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 group-hover:scale-105 transition-transform"
            >
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <BuyModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} creature={creature} />
    </>
  )
}
