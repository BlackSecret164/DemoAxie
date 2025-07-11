"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Loader2, Copy, ExternalLink } from "lucide-react"
import { useMockWeb3 } from "@/hooks/use-mock-web3"
import { toast } from "sonner"

export function MockWalletButton() {
  const { wallet, isLoading, contractInfo, connectWallet, disconnectWallet } = useMockWeb3()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: number) => {
    return `${bal.toFixed(4)} ETH`
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    toast.success('Address copied to clipboard!')
  }

  const viewOnEtherscan = () => {
    window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')
  }

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Connected
        </Badge>
        <div className="text-white text-sm">
          <div className="font-medium flex items-center space-x-1">
            <span>{formatAddress(wallet.address)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-4 w-4 p-0 text-white/70 hover:text-white"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={viewOnEtherscan}
              className="h-4 w-4 p-0 text-white/70 hover:text-white"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
          <div className="text-white/70 text-xs">{formatBalance(wallet.balance)}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isLoading}
      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}