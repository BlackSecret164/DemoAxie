"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Info, Copy, ExternalLink, Code } from "lucide-react"
import { useMockWeb3 } from "@/hooks/use-mock-web3"
import { toast } from "sonner"

export function ContractInfoModal() {
  const { contractInfo } = useMockWeb3()
  const [isOpen, setIsOpen] = useState(false)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
          <Code className="w-4 h-4 mr-2" />
          Contract Info
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-cyan-400" />
            <span>Smart Contract Information</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Network Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Network</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                {contractInfo.network}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Chain ID</span>
              <span className="text-white font-mono">{contractInfo.chainId}</span>
            </div>
          </div>

          {/* Axie NFT Contract */}
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span>Axie NFT Contract</span>
            </h3>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Address</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(contractInfo.axieContract, 'Contract address')}
                    className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEtherscan(contractInfo.axieContract)}
                    className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <code className="text-xs bg-white/10 px-2 py-1 rounded block break-all">
                {contractInfo.axieContract}
              </code>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Marketplace Contract */}
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span>Marketplace Contract</span>
            </h3>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Address</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(contractInfo.marketplaceContract, 'Contract address')}
                    className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEtherscan(contractInfo.marketplaceContract)}
                    className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <code className="text-xs bg-white/10 px-2 py-1 rounded block break-all">
                {contractInfo.marketplaceContract}
              </code>
            </div>
          </div>

          {/* Contract Features */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <h4 className="text-blue-200 font-medium mb-2 text-sm">Contract Features</h4>
            <ul className="text-xs text-blue-200/80 space-y-1">
              <li>• ERC-721 NFT Standard</li>
              <li>• Marketplace Trading</li>
              <li>• Ownership Transfer</li>
              <li>• Listing Management</li>
              <li>• Fee Collection (4.25%)</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}