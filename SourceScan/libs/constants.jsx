const getConfig = (network) => {
  switch (network) {
    case 'mainnet':
      return {
        appUrl: 'https://sourcescan.dev',
        ownerId: 'sourcescan.near',
        rpcUrl: 'https://rpc.mainnet.near.org',
        contractId: 'dev.sourcescan.near',
        apiHost: 'https://api.sourcescan.dev',
      }
    case 'testnet':
      return {
        appUrl: 'https://testnet.sourcescan.dev',
        ownerId: 'sourcescan.testnet',
        rpcUrl: 'https://rpc.testnet.near.org',
        contractId: 'dev.sourcescan.testnet',
        apiHost: 'https://api.sourcescan.dev',
      }
    default:
      throw Error(`Unconfigured environment '${network}'.`)
  }
}

const limits = [5, 10, 20, 50]

return { getConfig, limits }
