"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Loader2 } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"

export function WalletConnectButton() {
  const { isConnected, address, balance, isLoading, connectWallet, disconnectWallet } = useWeb3()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: string) => {
    return `${parseFloat(bal).toFixed(4)} ETH`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Connected
        </Badge>
        <div className="text-white text-sm">
          <div className="font-medium">{formatAddress(address)}</div>
          {balance && <div className="text-white/70 text-xs">{formatBalance(balance)}</div>}
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