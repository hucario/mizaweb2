import { em, rem } from "polished"
import styled from "styled-components"
import { RichEmbedContainer } from "./RichEmbedContainer"

export const CodeBlockContainer = styled.pre`
  max-width: 90%;
  margin: 6px 0 0;
  padding: ${em(8)};

  background: var(--background-secondary);
  border: 1px solid var(--background-tertiary);
  border-radius: 4px;

  color: var(--header-secondary);
  font-size: ${rem(14)};
  line-height: ${rem(18)};

  white-space: pre-wrap;

  ${RichEmbedContainer} && {
    max-width: 100%;

    background: var(--background-tertiary);
    border: none;
  }

  & .hljs-comment,
  & .hljs-quote {
    color: var(--interactive-muted);
  }

  & .hljs-addition,
  & .hljs-keyword,
  & .hljs-selector-tag {
    color: #859900;
  }

  & .hljs-doctag,
  & .hljs-literal,
  & .hljs-meta .hljs-meta-string,
  & .hljs-number,
  & .hljs-regexp,
  & .hljs-string {
    color: #2aa198;
  }

  & .hljs-name,
  & .hljs-section,
  & .hljs-selector-class,
  & .hljs-selector-id,
  & .hljs-title {
    color: #268bd2;
  }

  & .hljs-attr,
  & .hljs-attribute,
  & .hljs-class .hljs-title,
  & .hljs-template-variable,
  & .hljs-type,
  & .hljs-variable {
    color: #b58900;
  }

  & .hljs-bullet,
  & .hljs-link,
  & .hljs-meta,
  & .hljs-meta .hljs-keyword,
  & .hljs-selector-attr,
  & .hljs-selector-pseudo,
  & .hljs-subst,
  & .hljs-symbol {
    color: #cb4b16;
  }

  & .hljs-built_in,
  & .hljs-deletion {
    color: #dc322f;
  }

  & .hljs-formula {
    background: #073642;
  }

  & .hljs-emphasis {
    font-style: italic;
  }

  & .hljs-strong {
    font-weight: 700;
  }
`
