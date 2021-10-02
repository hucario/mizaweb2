import { tint, transparentize } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "./darkTheme"

export const Mention = styled.span`
  border-radius: 3px;
  padding: 0 2px;
  cursor: pointer;
  background: ${transparentize(0.9, DARK_THEME.discord.primary)};
  color: ${({ theme }) => theme.discord.primary};
  font-weight: 500;
  &:hover {
    background: ${transparentize(0.3, DARK_THEME.discord.primary)};
    color: var(--header-primary);
  }
`