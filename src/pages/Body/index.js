import React, { useState, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useWeb3Context } from 'web3-react'
import { useAppContext } from '../../context'
import Gallery from '../../components/Gallery'
import BuyButtons from '../../components/Buttons'
import Button from '../../components/Button'
import Checkout from '../../components/Checkout'
import Redeem from '../../components/Redeem'
import { amountFormatter } from '../../utils'
import useInitializedVariables from '../../utils/helper'

function Header({ ready, dollarPrice }) {
  const { account } = useWeb3Context()

  return (
    <HeaderFrame>
      <Status ready={ready} account={account} />
      <Title>Uni ring tokens (URING)</Title>
      <CurrentPrice>{dollarPrice && `$${amountFormatter(dollarPrice, 18, 2)} USD`}</CurrentPrice>
      <Tagline>dynamically priced rings</Tagline>
    </HeaderFrame>
  )
}

export default function Body() {
  const { account, setConnector } = useWeb3Context()
  const [state, setState] = useAppContext()
  const [currentTransaction, _setCurrentTransaction] = useState({})
  const [loading, setLoading] = useState(false)
  const setCurrentTransaction = useCallback((hash, type, amount) => {
    _setCurrentTransaction({ hash, type, amount })
  }, [])
  const clearCurrentTransaction = useCallback(() => {
    _setCurrentTransaction({})
  }, [])

  const {selectedTokenSymbol,
    setSelectedTokenSymbol,
    ready,
    unlock,
    validateBuy,
    buy,
    validateSell,
    sell,
    dollarize,
    dollarPrice,
    balanceSOCKS,
    reserveSOCKSToken} = useInitializedVariables();

  function handleToggleCheckout(tradeType) {
    setState(state => ({ ...state, redeemVisible: !state.redeemVisible, tradeType }))
  }

  async function redeem() {
    if (account === null) {
      setConnector('Injected', { suppressAndThrowErrors: true })
    }

    handleToggleCheckout()
  }

  function renderContent() {
    return (
      <div>
        <Redeem loading={loading} setLoading={setLoading}/>
      </div>
    )
  }

  return (
    <AppWrapper>
      <Header ready={ready} dollarPrice={dollarPrice} />
      <Gallery />
      <div>
        <Intro>
          purchasing a <b>URING</b> entitles you to 1{' '}
          <i>
            <b>real</b>
          </i>{' '}
          limited edition uni ring, shipped anywhere in the world.
        </Intro>
        <BuyButtons balance={balanceSOCKS} />
        <MarketData>
          {balanceSOCKS > 0 ? (
            <SockCount>
              You own {balanceSOCKS && `${amountFormatter(balanceSOCKS, 18, 0)}`} URINGS&nbsp; • &nbsp;
            </SockCount>
          ) : (
            ''
          )}
          <SockCount>{reserveSOCKSToken && `${amountFormatter(reserveSOCKSToken, 18, 0)} available`}</SockCount>
        </MarketData>
        <RedeemSection>
          <RedeemLink>
            <Button style={{ width: '200px' }} onClick={() => redeem()} text={'Redeem'} />
          </RedeemLink>
          <p>
            <a target="_" href="https://ipfs.infura.io/ipfs/QmVPXerxekzpaxaAvZE2cHU51c9cYumJzLPoLd36385X6u">
              Warranty
            </a>{' '}
            for Tokenized Goods
          </p>
        </RedeemSection>
      </div>
      <Checkout
        selectedTokenSymbol={selectedTokenSymbol}
        setSelectedTokenSymbol={setSelectedTokenSymbol}
        ready={ready}
        unlock={unlock}
        validateBuy={validateBuy}
        buy={buy}
        validateSell={validateSell}
        sell={sell}
        dollarize={dollarize}
        currentTransactionHash={currentTransaction.hash}
        currentTransactionType={currentTransaction.type}
        currentTransactionAmount={currentTransaction.amount}
        setCurrentTransaction={setCurrentTransaction}
        clearCurrentTransaction={clearCurrentTransaction}
      />
      <div>
        <CheckoutFrame redeemVisible={state.redeemVisible}>{renderContent()}</CheckoutFrame>
        <CheckoutBackground
          onClick={() => setState(state => ({ ...state, redeemVisible: !state.redeemVisible }))}
          redeemVisible={state.redeemVisible}
          loading={loading}
        />
      </div>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  width: 100vw;
  max-width: 640px;
  margin: 0px auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 20vh;
  overflow: scroll;
  @media only screen and (min-device-width: 768px) {
    max-height: 480px;
    overflow: hidden;
    height: 100%;
  }
  @media only screen and (max-width: 640px) {
    /* padding-top: 0px; */
    overflow: hidden;
    padding-left: 2rem;
    max-height: 640px;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 0px;
    padding-left: 0px;
    overflow: hidden;
    max-height: 800px;
  }
`

const Status = styled.div`
  width: 12px;
  height: 12px;
  position: fixed;
  top: 16px;
  right: 24px;
  border-radius: 100%;
  background-color: ${props =>
    props.account === null ? props.theme.orange : props.ready ? props.theme.green : props.theme.orange};
`

const HeaderFrame = styled.div`
  text-align: left;
  margin: 0px;
  font-size: 1.25rem;
  width: 100%;
  color: ${props => props.theme.primary};
  @media only screen and (max-width: 480px) {
    /* For mobile phones: */
    padding: 10vw;
    padding-top: 10vh;
  }
`

const Title = styled.p`
  font-weight: 500;
  margin: 0px;
  margin-bottom: 10px;
`

const Tagline = styled.p`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0px;
  margin-top: 2rem;
`

const Success = styled.p`
  margin-top: 10px;
  font-weight: bold;
  color: ${props => props.theme.uniswapPink}
  display: ${props => (props.visible ? 'block' : 'none')}
`

const Error = styled.p`
  margin-top: 10px;
  font-weight: bold;
  color: ${props => props.theme.uniswapPink}
  display: ${props => (props.visible ? 'block' : 'none')}
`

const CurrentPrice = styled.p`
  font-weight: 700;
  margin: 0px;
  height: 1.125rem;
`

const Intro = styled.p`
  /* padding-left: 5vw; */
  margin: 0px;
  max-width: 300px;
  line-height: 180%;
  font-weight: 500;
  color: ${props => props.theme.primary};
  @media only screen and (max-width: 480px) {
    /* For mobile phones: */
    margin-top: 2rem;
    padding-left: 10vw;
  }
`

const SockCount = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  color: ${props => props.theme.uniswapPink};
  height: 0.5rem;
`

const RedeemSection = styled.div`
  font-weight: 500;
  /* padding-left: 10vw; */
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.primary};
  @media only screen and (max-width: 480px) {
    /* For mobile phones: */
    /* margin-top: 2rem; */
    padding-left: 10vw;
  }
`

const RedeemLink = styled.span`
  /* font-size: 1rem; */
  text-decoration: italic;
  opacity: 1;
  /* color: ${props => props.theme.blue}; */
`

const MarketData = styled.div`
  display: flex;
  flex-direction: row;
  /* padding-left: 5vw; */
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  /* padding-bottom: 0.5rem; */
  @media only screen and (max-width: 480px) {
    /* For mobile phones: */
    padding-left: 10vw;
  }
`
const CheckoutFrame = styled.form`
  position: fixed;
  bottom: ${props => (props.redeemVisible ? '0px' : '-100%')};
  left: 0px;
  z-index: ${props => (props.redeemVisible ? '2' : '-1  ')};
  opacity: ${props => (props.redeemVisible ? '1' : '0')};
  transition: bottom 0.3s;
  width: 100%;
  margin: 0px;
  top: 5px;
  padding: 2rem;
  border-radius: 20px 0 0 20px;
  padding-top: 5px;
  height: calc(90vh - 50px);
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${props => props.theme.grey};
  border-color: ${props => props.theme.black};
  color: ${props => props.theme.primary};

  @media only screen and (min-device-width: 768px) {
    max-width: 375px;
    margin: 5% auto; /* Will not center vertically and won't work in IE6/7. */
    margin-top: 10px;
    left: 0;
    right: 0;
    z-index: ${props => (props.redeemVisible ? '2' : '-1  ')};
    opacity: ${props => (props.redeemVisible ? '1' : '0')};

    bottom: ${props => (props.redeemVisible ? '20%' : '-100%')};
  }
`

const CheckoutBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  opacity: ${props => (props.redeemVisible ? '.2' : '0')};
  width: 100vw;
  height: 100vh;
  z-index: ${props => (props.redeemVisible ? '1' : '-1')};
  pointer-events: ${props => (props.redeemVisible && !props.loading ? 'all' : 'none')};
  background-color: ${props => props.theme.black};
  transition: opacity 0.3s;
`