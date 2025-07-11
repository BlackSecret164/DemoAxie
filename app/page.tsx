import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceSidebar } from "@/components/marketplace-sidebar"
import { CreatureGrid } from "@/components/creature-grid"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <MarketplaceSidebar />
          <CreatureGrid />
        </div>
      </div>
    </div>
  )
}
