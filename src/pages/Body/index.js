import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'web3-react'

import Gallery from '../../components/Gallery'
import BuyButtons from '../../components/Buttons'
import Checkout from '../../components/Checkout'
import { amountFormatter } from '../../utils'

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

export default function Body({
  selectedTokenSymbol,
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
  reserveSOCKSToken
}) {
  const [currentTransaction, _setCurrentTransaction] = useState({})
  const setCurrentTransaction = useCallback((hash, type, amount) => {
    _setCurrentTransaction({ hash, type, amount })
  }, [])
  const clearCurrentTransaction = useCallback(() => {
    _setCurrentTransaction({})
  }, [])

  const Content = (
    <span>
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
              You own {balanceSOCKS && `${amountFormatter(balanceSOCKS, 18, 0)}`} SOCKS&nbsp; • &nbsp;
            </SockCount>
          ) : (
            ''
          )}
          <SockCount>{reserveSOCKSToken && `${amountFormatter(reserveSOCKSToken, 18, 0)}/20 available`}</SockCount>
        </MarketData>
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
    </span>
  )

  return <AppWrapper>{Content}{Content}{Content}</AppWrapper>
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
  padding-top: 50px;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  text-align: center;
  @media only screen and (min-device-width: 768px) {

    overflow: hidden;
    height: 100%;
  }
  @media only screen and (max-width: 640px) {
    /* padding-top: 0px; */
    overflow: hidden;
    padding-left: 2rem;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 0px;
    padding-left: 0px;
    overflow: hidden;
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
  text-align:left;
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

const Redeem = styled.p`
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
