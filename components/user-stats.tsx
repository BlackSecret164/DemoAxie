import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, Trophy, Star } from "lucide-react"

export function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="bg-cyan-500/20 p-3 rounded-lg">
            <Wallet className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Total Axies</p>
            <p className="text-white font-bold text-xl">12</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Total Value</p>
            <p className="text-white font-bold text-xl">2.45 ETH</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <Trophy className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Battles Won</p>
            <p className="text-white font-bold text-xl">147</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-white/70 text-sm">MMR Rating</p>
            <p className="text-white font-bold text-xl">1,847</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
