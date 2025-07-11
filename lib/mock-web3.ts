// Mock Web3 Service for simulation
export interface MockWallet {
  address: string
  balance: number
  isConnected: boolean
}

export interface MockTransaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  status: 'pending' | 'success' | 'failed'
  type: 'buy' | 'sell' | 'cancel'
  tokenId: number
}

export interface ContractInfo {
  axieContract: string
  marketplaceContract: string
  network: string
  chainId: number
}

class MockWeb3Service {
  private wallet: MockWallet = {
    address: '',
    balance: 0,
    isConnected: false
  }

  private transactions: MockTransaction[] = []
  private contractInfo: ContractInfo = {
    axieContract: '0x32950db2a7164aE833121501C797D79E7B79d74C',
    marketplaceContract: '0xF4985070Ce32b6B1994329DF787D1aCc9a2dd9e2',
    network: 'Ethereum Mainnet',
    chainId: 1
  }

  // Generate random wallet address
  private generateAddress(): string {
    const chars = '0123456789abcdef'
    let address = '0x'
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)]
    }
    return address
  }

  // Generate transaction hash
  private generateTxHash(): string {
    const chars = '0123456789abcdef'
    let hash = '0x'
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)]
    }
    return hash
  }

  // Simulate wallet connection
  async connectWallet(): Promise<MockWallet> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.wallet = {
          address: this.generateAddress(),
          balance: Math.random() * 10 + 5, // 5-15 ETH
          isConnected: true
        }
        resolve(this.wallet)
      }, 1500) // Simulate connection delay
    })
  }

  // Disconnect wallet
  disconnectWallet(): void {
    this.wallet = {
      address: '',
      balance: 0,
      isConnected: false
    }
  }

  // Get wallet info
  getWallet(): MockWallet {
    return this.wallet
  }

  // Get contract info
  getContractInfo(): ContractInfo {
    return this.contractInfo
  }

  // Simulate buying NFT
  async buyNFT(tokenId: number, price: string): Promise<MockTransaction> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const priceNum = parseFloat(price)
        const gasFee = 0.003
        const totalCost = priceNum + gasFee

        if (!this.wallet.isConnected) {
          reject(new Error('Wallet not connected'))
          return
        }

        if (this.wallet.balance < totalCost) {
          reject(new Error('Insufficient funds'))
          return
        }

        // Deduct balance
        this.wallet.balance -= totalCost

        const transaction: MockTransaction = {
          hash: this.generateTxHash(),
          from: this.wallet.address,
          to: this.contractInfo.marketplaceContract,
          value: price,
          timestamp: Date.now(),
          status: 'success',
          type: 'buy',
          tokenId
        }

        this.transactions.push(transaction)
        resolve(transaction)
      }, 2000) // Simulate transaction time
    })
  }

  // Simulate selling NFT
  async sellNFT(tokenId: number, price: string): Promise<MockTransaction> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.wallet.isConnected) {
          reject(new Error('Wallet not connected'))
          return
        }

        const transaction: MockTransaction = {
          hash: this.generateTxHash(),
          from: this.wallet.address,
          to: this.contractInfo.marketplaceContract,
          value: price,
          timestamp: Date.now(),
          status: 'success',
          type: 'sell',
          tokenId
        }

        this.transactions.push(transaction)
        resolve(transaction)
      }, 2000)
    })
  }

  // Simulate canceling listing
  async cancelListing(tokenId: number): Promise<MockTransaction> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.wallet.isConnected) {
          reject(new Error('Wallet not connected'))
          return
        }

        const transaction: MockTransaction = {
          hash: this.generateTxHash(),
          from: this.wallet.address,
          to: this.contractInfo.marketplaceContract,
          value: '0',
          timestamp: Date.now(),
          status: 'success',
          type: 'cancel',
          tokenId
        }

        this.transactions.push(transaction)
        resolve(transaction)
      }, 1500)
    })
  }

  // Get transaction history
  getTransactions(): MockTransaction[] {
    return this.transactions
  }

  // Get transaction by hash
  getTransaction(hash: string): MockTransaction | undefined {
    return this.transactions.find(tx => tx.hash === hash)
  }

  // Estimate gas fee
  async estimateGas(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const gasFee = (Math.random() * 0.005 + 0.001).toFixed(6) // 0.001-0.006 ETH
        resolve(gasFee)
      }, 500)
    })
  }
}

export const mockWeb3Service = new MockWeb3Service()