import React, { useState, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Body from '../Body'
import { TOKEN_SYMBOLS, TOKEN_ADDRESSES, ERROR_CODES } from '../../utils'

export default function Main() {

  const shirtToken = {
    tokenSymbol: TOKEN_SYMBOLS.LSHRT,
    tokenAddress: TOKEN_ADDRESSES.LSHRT,
    tokenName: 'Law Shirt',
    description: 'shirts'
  }

  const uringToken = {
    tokenSymbol: TOKEN_SYMBOLS.SOCKS,
    tokenAddress: TOKEN_ADDRESSES.SOCKS,
    tokenName: `Uni Ring`,
    description: 'rings'
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
