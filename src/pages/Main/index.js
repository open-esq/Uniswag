import React, { useState, useCallback, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'

import { TOKEN_SYMBOLS, TOKEN_ADDRESSES, ERROR_CODES } from '../../utils'
import {
  useTokenContract,
  useExchangeContract,
  useAddressBalance,
  useAddressAllowance,
  useExchangeReserves,
  useExchangeAllowance,
  useItemFetch
} from '../../hooks'
import Body from '../Body'

// denominated in bips

export default function Main() {
  const { library, account } = useWeb3Context()

  // get items
  const items = useItemFetch()
  console.log(items)

  return (
    <span>
      {items ? items.map(item=>{
        return <Body item={item}/>
      }) : null }
    </span>
  )
}
