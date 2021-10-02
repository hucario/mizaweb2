import React, { ReactNode } from "react"
import styled from "styled-components"
import { RichEmbedContainer } from "./RichEmbedContainer"

const BlockQuoteContainer = styled.div`
  display: flex;
`

const BlockQuoteDivider = styled.div`
  min-width: 4px;
  max-width: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.interactive.muted};
`

const BlockQuoteContent = styled.blockquote`
  max-width: 90%;
  padding: 0 8px 0 12px;
  margin: 0;
  text-indent: 0;
  ${RichEmbedContainer} & {
    max-width: 100%;
  }
`

export type BlockQuoteProps = {
  children: ReactNode
}

export function BlockQuote(props: BlockQuoteProps) {
  const { children } = props

  return (
    <BlockQuoteContainer>
      <BlockQuoteDivider />
      <BlockQuoteContent>{children}</BlockQuoteContent>
    </BlockQuoteContainer>
  )
}