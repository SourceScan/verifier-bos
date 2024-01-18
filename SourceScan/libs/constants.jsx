const getConfig = (network) => {
  switch (network) {
    case 'mainnet':
      return {
        appUrl: 'https://sourcescan.dev',
        verifierId: 'sourcescan.near',
        ownerId: 'sourcescan.near',
        rpcUrl: 'https://rpc.mainnet.near.org',
        contractId: 'dev.sourcescan.near',
        apiHost: 'https://api.sourcescan.dev',
      }
    case 'testnet':
      return {
        appUrl: 'https://testnet.sourcescan.dev',
        verifierId: 'sourcescan.testnet',
        ownerId: 'sourcescan.testnet',
        rpcUrl: 'https://rpc.testnet.near.org',
        contractId: 'dev.sourcescan.testnet',
        apiHost: 'https://api.sourcescan.dev',
      }
    default:
      throw Error(`Unconfigured environment '${network}'.`)
  }
}

return { getConfig }
