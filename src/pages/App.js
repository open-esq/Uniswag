import React from 'react'
import Web3Provider, { Connectors } from 'web3-react'
import WalletConnectApi from '@walletconnect/web3-subprovider'

import GlobalStyle, { ThemeProvider } from '../theme'
import Web3ReactManager from '../components/Web3ReactManager'
import AppProvider from '../context'
import Main from './Main'

const PROVIDER_URL = process.env.REACT_APP_INFURA_URL

const { NetworkOnlyConnector, InjectedConnector, WalletConnectConnector } = Connectors
const Network = new NetworkOnlyConnector({
  providerURL: PROVIDER_URL
})
const Injected = new InjectedConnector({ supportedNetworks: [1] })
const WalletConnect = new WalletConnectConnector({
  api: WalletConnectApi,
  bridge: 'https://bridge.walletconnect.org',
  supportedNetworkURLs: {
    1: PROVIDER_URL
  },
  defaultNetwork: 1
})
const connectors = { Network, Injected, WalletConnect }

export default function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
          <Web3ReactManager>
            <AppProvider>
              <Main />
            </AppProvider>
          </Web3ReactManager>
        </Web3Provider>
      </>
    </ThemeProvider>
  )
}
