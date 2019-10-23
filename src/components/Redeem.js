import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useWeb3Context } from 'web3-react'
import { TOKEN_ADDRESSES, getContract } from '../utils'
import { getCountries, getStates } from 'country-state-picker'
import LoadingDots from './LoadingDots'
import Button from './Button'
import BurnableERC20 from '../BurnableERC20.json'

export default function Redeem() {
  const { library, account } = useWeb3Context()
  const [country, setCountry] = useState(null)
  const [division, setDivision] = useState(null)
  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [postalCode, setPostalCode] = useState(null)
  const [email, setEmail] = useState(null)
  const [isEmailError, setEmailError] = useState(false)
  const [isAddressComplete, setAddressError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isSubmitError, setSubmitError] = useState(false)

  const successRef = useRef()
  useEffect(() => {
    if (isSuccess) {
      successRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isSuccess])

  async function redeemSubmit() {
    setEmailError(false)
    setAddressError(false)
    setLoading(false)
    setSuccess(false)
    setSubmitError(false)

    const contract = getContract(TOKEN_ADDRESSES.SOCKS, BurnableERC20, library, account)
    const addressInfo = {
      name,
      address,
      city,
      country,
      division,
      postalCode,
      email
    }

    const formComplete = validateForm(addressInfo)

    if (formComplete) {
      setLoading(true)
      const overrides = {
        gasLimit: 750000
      }

      // Burning token by sending it back to pool of URING tokens not on Uniswap
      const res = await contract.transfer('0xcC4Dc8e92A6E30b6F5F6E65156b121D9f83Ca18F', (1e18).toString(), overrides)

      const txReceipt = await library.getTransactionReceipt(res.hash)

      console.log(res)
      console.log(txReceipt)

      // Successful contract call to burn token
      if (txReceipt.status === 1) {
        window.emailjs.send(
          'default_service', // default email provider in your EmailJS account
          'test',
          addressInfo
        )
        setSuccess(true)
      } else {
        setSubmitError(true)
      }
    }
  }

  function validateForm(addressInfo) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const emailValid = re.test(String(email).toLowerCase())
    console.log(emailValid)

    emailValid ? setEmailError(false) : setEmailError(true)

    const addressComplete = Object.values(addressInfo).every(o => o != null)

    addressComplete ? setAddressError(false) : setAddressError(true)

    return emailValid && addressComplete
  }

  return (
    <div style={{ width: '100%' }}>
      <h3>Shipping Info {isAddressComplete ? <font color="#DC6BE5"> Form incomplete</font> : null}</h3>
      <p>Name</p>
      <Input onChange={e => setName(e.target.value)}></Input>
      <p>Address</p>
      <Input onChange={e => setAddress(e.target.value)}></Input>
      <p>City</p>
      <Input onChange={e => setCity(e.target.value)}></Input>
      <p>Country</p>
      <Select onChange={e => setCountry(e.target.value)}>
        <option value="" selected disabled hidden>
          Choose here
        </option>
        {getCountries().map(countries => {
          return <option value={countries.code}>{countries.name}</option>
        })}
      </Select>
      <p>State/Province</p>
      <Select onChange={e => setDivision(e.target.value)}>
        {country
          ? getStates(country).map(state => {
              return <option value={state}>{state}</option>
            })
          : null}
      </Select>
      <p>Postal Code</p>
      <Input onChange={e => setPostalCode(e.target.value)}></Input>

      <p>
        E-mail Address{' '}
        {isEmailError ? (
          <font color="#DC6BE5">
            <b> Invalid E-mail</b>
          </font>
        ) : null}
      </p>
      <Input onChange={e => setEmail(e.target.value)}></Input>

      <i>By burning 1 URING token, you confirm shipment to this address</i>
      <Button
        disabled={isSuccess || !account ? true : null}
        style={{ marginTop: '1em', width: '200px' }}
        onClick={() => redeemSubmit()}
        text={loading && !isSuccess ? <LoadingDots /> : 'Confirm'}
      />
      <Message ref={successRef} visible={isSuccess}>
        Redemption Successful!
      </Message>
      <Message visible={isSubmitError}>Something went wrong...</Message>
    </div>
  )
}

const formStyle = css`
  font-size: 1rem;
  border-radius: 24px;
  margin-bottom: 1rem;
  font-family: sans-serif;
  font-weight: 700;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  appearance: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border: none;
  padding: 0px 1rem 0px 1rem;
  text-align: center;
  text-align-last: center;
  outline: none;
`
const Select = styled.select`
  ${formStyle}
`

const Input = styled.input`
  ${formStyle}
`
const Message = styled.p`
  margin-top: 10px;
  font-weight: bold;
  color: ${props => props.theme.uniswapPink}
  display: ${props => (props.visible ? 'block' : 'none')}
`
