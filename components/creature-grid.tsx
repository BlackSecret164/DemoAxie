import { MockAxieCard } from "@/components/mock-axie-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import { useNFT } from "@/contexts/nft-context"

export function CreatureGrid() {
  const { marketplaceNFTs } = useNFT()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <span className="text-white/70">{marketplaceNFTs.length} Axies</span>
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
        {marketplaceNFTs.map((creature) => (
          <MockAxieCard key={creature.id} creature={creature} />
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
