import React, { useState, useCallback, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import styled from 'styled-components'
import { Container, Segment, Form, Header } from 'semantic-ui-react'
import { ethers } from 'ethers'
import { useDropzone } from 'react-dropzone'

import { TOKEN_SYMBOLS, TOKEN_ADDRESSES, ERROR_CODES } from '../../utils'
import { useItemFetch, useAddItemForm } from '../../hooks'
import Body from '../Body'
import {} from '../../hooks'
const API_URL = 'https://mirai-server.now.sh/books'
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <DropzoneDiv {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Upload a pic of your item</p>
      <p>JPG only</p>
      </DropzoneDiv>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default function Main() {
  const { library, account } = useWeb3Context()
  async function addItem() {
    console.log(`Item Created!
    address: ${inputs.tokenAddress}
    description: ${inputs.itemDescription}`)

    const response = await fetch(API_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: inputs.tokenAddress,
        bookTitle: inputs.itemDescription,
        secret: `SECRET RESROUCE`
      })
    })
    if (response.status !== 200) throw Error(response.message)
    const text = await response.text()
    console.log(text)
    return JSON.parse(text)
  }

  const { inputs, handleInputChange, handleSubmit } = useAddItemForm(addItem)

  // get items
  const items = useItemFetch()
  console.log(items)

  return (
    <span>
      <Segment style={{ textAlign: '-webkit-center', float: 'left', margin: '3em', width: '400px' }}>
        <Header as="h2">Add your Uniswap item</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Token Address"
            name="tokenAddress"
            onChange={handleInputChange}
            value={inputs.tokenAddress}
          />
          <Form.Input
            label="Item Description"
            name="itemDescription"
            onChange={handleInputChange}
            value={inputs.itemDescription}
          />

          <Previews />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Segment>

      <AppWrapper>
        {items
          ? items.map(item => {
              return <Body item={item} />
            })
          : null}
      </AppWrapper>
    </span>
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

const DropzoneDiv = styled.div`
  max-width: 200px;
  height: 100px;
  text-align: center;
  border-width: 1px;
  border: 3px solid rgba(34, 36, 38, 0.15);
  border-radius: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
`
const ThumbsContainer = styled.aside`
  display: flex;
  flexdirection: row;
  flexwrap: wrap;
`
