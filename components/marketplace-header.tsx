import { Search, Wallet, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MarketplaceHeader() {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-bold text-xl">AxieVerse</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-cyan-400 font-medium">
                Marketplace
              </a>
              <a href="/my-axies" className="text-white/70 hover:text-white">
                My Axies
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                Breeding
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                Battle
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search Axies..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
