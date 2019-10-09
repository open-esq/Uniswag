import * as React from 'react'
import styled from 'styled-components'

import test from './urings.jpg'

const GalleryFrame = styled.div`
  width: 90vw;
  height: 90vw;
  min-height: 150px;
  min-width: 200px;
  max-height: 250px;
  max-width: 250px;
  display: flex;
  align-items: center;
  flex-direction: center;
  @media only screen and (max-width: 480px) {
    padding-left: 10vw;
  }
`

const ImgStyle = styled.img`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${props => props.theme.black};
`

export default function Gallery() {
  return (
    <GalleryFrame>
      <ImgStyle src={test} alt="Logo" />
    </GalleryFrame>
  )
}
