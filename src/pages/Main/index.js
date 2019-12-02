import React, { useState, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Body from '../Body'
import { TOKEN_SYMBOLS, TOKEN_ADDRESSES, ERROR_CODES } from '../../utils'
import uringImg from './urings.jpg'
import shirtImg from './shirt.jpg'

export default function Main() {
  const shirtToken = {
    tokenSymbol: TOKEN_SYMBOLS.LSHRT,
    tokenAddress: TOKEN_ADDRESSES.LSHRT,
    tokenName: 'Law Shirt',
    description: 'shirts',
    imgSrc: shirtImg
  }

  const uringToken = {
    tokenSymbol: TOKEN_SYMBOLS.URING,
    tokenAddress: TOKEN_ADDRESSES.URING,
    tokenName: `Uni Ring`,
    description: 'rings',
    imgSrc: uringImg
  }

  return (
    <>
      <TitleContainer>
        <Title>Uniswag</Title>
        <span style={{fontWeight: '400'}}>
          a curated list of tokenized products sold on{' '}
          <Pink href="https://uniswap.io/" target="_blank" rel="noopener noreferrer">
            Uniswap{' '}
            <span role="img" aria-label="unicorn">
              🦄
            </span>
          </Pink>
        </span>
      </TitleContainer>
      <Container>
        <Body token={shirtToken} />
        <Body token={uringToken} />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const TitleContainer = styled.div`
  text-align: center;
  margin-top: 5vh;
`

const Title = styled.h1`
  font-family: sans-serif;
`

const Pink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.uniswapPink};
`
