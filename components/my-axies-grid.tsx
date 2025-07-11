"use client"

import { useState } from "react"
import { MockMyAxieCard } from "@/components/mock-my-axie-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Plus } from "lucide-react"
import { useNFT } from "@/contexts/nft-context"

export function MyAxiesGrid() {
  const { userNFTs } = useNFT()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">My Axies</h1>
          <span className="text-white/70">{userNFTs.length} Axies</span>
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
        {userNFTs.map((axie) => (
          <MockMyAxieCard
            key={axie.id}
            axie={axie}
          />
        ))}
      </div>

      {userNFTs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/50 mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Axies Yet</h3>
            <p className="text-sm">Purchase your first Axie from the marketplace to get started!</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Browse Marketplace
          </Button>
        </div>
      )}
    </div>
  )
}
