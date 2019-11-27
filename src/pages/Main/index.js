import React, { useState, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Body from '../Body'

export default function Main() {
 
  return (
    <Container>
      <Body />
      <Body />
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
`
