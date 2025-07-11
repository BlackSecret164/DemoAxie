import { AxieCardEnhanced } from "@/components/axie-card-enhanced"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"

const creatures = [
  {
    id: 1,
    name: "Mystic Guardian #4521",
    image: "/images/axies/mystic-guardian.png",
    price: "0.045",
    class: "Beast",
    hp: 57,
    speed: 35,
    skill: 31,
    morale: 44,
    breed: "2/7",
    purity: 6,
  },
  {
    id: 2,
    name: "Aqua Warrior #7832",
    image: "/images/axies/aqua-warrior.png",
    price: "0.032",
    class: "Aquatic",
    hp: 59,
    speed: 39,
    skill: 35,
    morale: 27,
    breed: "0/7",
    purity: 5,
  },
  {
    id: 3,
    name: "Plant Defender #2156",
    image: "/images/axies/plant-defender.png",
    price: "0.028",
    class: "Plant",
    hp: 61,
    speed: 31,
    skill: 31,
    morale: 41,
    breed: "1/7",
    purity: 6,
  },
  {
    id: 4,
    name: "Bird Striker #9043",
    image: "/images/axies/bird-striker.png",
    price: "0.055",
    class: "Bird",
    hp: 27,
    speed: 67,
    skill: 35,
    morale: 35,
    breed: "3/7",
    purity: 4,
  },
  {
    id: 5,
    name: "Bug Assassin #6721",
    image: "/images/axies/bug-assassin.png",
    price: "0.041",
    class: "Bug",
    hp: 35,
    speed: 42,
    skill: 35,
    morale: 52,
    breed: "2/7",
    purity: 5,
  },
  {
    id: 6,
    name: "Reptile Tank #3498",
    image: "/images/axies/reptile-tank.png",
    price: "0.037",
    class: "Reptile",
    hp: 59,
    speed: 31,
    skill: 31,
    morale: 43,
    breed: "1/7",
    purity: 6,
  },
]

export function CreatureGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <span className="text-white/70">12,847 Axies</span>
        </div>

        <div className="flex items-center space-x-4">
          <Select defaultValue="price-low">
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="recently-listed">Recently Listed</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>

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
        {creatures.map((creature) => (
          <AxieCardEnhanced key={creature.id} creature={creature} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          Load More
        </Button>
      </div>
    </div>
  )
}
