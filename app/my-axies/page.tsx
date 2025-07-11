import { MarketplaceHeader } from "@/components/marketplace-header"
import { MyAxiesGrid } from "@/components/my-axies-grid"
import { UserStats } from "@/components/user-stats"

export default function MyAxiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <UserStats />
          <MyAxiesGrid />
        </div>
      </div>
    </div>
  )
}
