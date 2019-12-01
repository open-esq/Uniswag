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
    <Container>
      <Body token={shirtToken}/>
      <Body token={uringToken}/>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
`
