import * as React from 'react'
import styled from 'styled-components'

import test from './urings.jpg'

const GalleryFrame = styled.div`
  width: 90vw;
  padding-top:10px;
  min-height: 150px;
  min-width: 200px;
  max-height: 250px;
  max-width: 250px;
  display: flex;
  align-items: center;
  flex-direction: center;;
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
