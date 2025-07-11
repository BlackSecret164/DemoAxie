"use client"

import { useState } from "react"
import { MyAxieCardEnhanced } from "@/components/my-axie-card-enhanced"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Plus } from "lucide-react"

const myAxies = [
  {
    id: 1,
    name: "Thunder Beast #4521",
    image: "/images/axies/beast-thunder.png",
    class: "Beast",
    hp: 57,
    speed: 35,
    skill: 31,
    morale: 44,
    breed: "2/7",
    purity: 6,
    isListed: false,
    listedPrice: null,
    lastBattleWon: true,
    exp: 1250,
  },
  {
    id: 2,
    name: "Aqua Guardian #7832",
    image: "/images/axies/aqua-guardian.png",
    class: "Aquatic",
    hp: 59,
    speed: 39,
    skill: 35,
    morale: 27,
    breed: "0/7",
    purity: 5,
    isListed: true,
    listedPrice: "0.032",
    lastBattleWon: false,
    exp: 890,
  },
  {
    id: 3,
    name: "Plant Tank #2156",
    image: "/images/axies/plant-tank.png",
    class: "Plant",
    hp: 61,
    speed: 31,
    skill: 31,
    morale: 41,
    breed: "1/7",
    purity: 6,
    isListed: false,
    listedPrice: null,
    lastBattleWon: true,
    exp: 2100,
  },
  {
    id: 4,
    name: "Sky Striker #9043",
    image: "/images/axies/bird-striker.png",
    class: "Bird",
    hp: 27,
    speed: 67,
    skill: 35,
    morale: 35,
    breed: "3/7",
    purity: 4,
    isListed: false,
    listedPrice: null,
    lastBattleWon: true,
    exp: 1750,
  },
]

export function MyAxiesGrid() {
  const [axies, setAxies] = useState(myAxies)

  const handleListForSale = (axieId: number, price: string) => {
    setAxies((prev) =>
      prev.map((axie) => (axie.id === axieId ? { ...axie, isListed: true, listedPrice: price } : axie)),
    )
  }

  const handleRemoveFromSale = (axieId: number) => {
    setAxies((prev) =>
      prev.map((axie) => (axie.id === axieId ? { ...axie, isListed: false, listedPrice: null } : axie)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">My Axies</h1>
          <span className="text-white/70">{axies.length} Axies</span>
        </div>

        <div className="flex items-center space-x-4">
          <Select defaultValue="recently-used">
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently-used">Recently Used</SelectItem>
              <SelectItem value="highest-level">Highest Level</SelectItem>
              <SelectItem value="class">By Class</SelectItem>
              <SelectItem value="listed">Listed for Sale</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Buy More
          </Button>

          <div className="flex bg-white/10 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="text-white">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white/50">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {axies.map((axie) => (
          <MyAxieCardEnhanced
            key={axie.id}
            axie={axie}
            onListForSale={handleListForSale}
            onRemoveFromSale={handleRemoveFromSale}
          />
        ))}
      </div>
    </div>
  )
}
