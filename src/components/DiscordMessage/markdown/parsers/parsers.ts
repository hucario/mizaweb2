import { parseEmbedContent } from "./parseEmbedContent"
import { parseEmbedHeader } from "./parseEmbedHeader"
import { parseMessageContent } from "./parseMessageContent"

export const PARSERS = {
  "default": parseMessageContent,
  "message-content": parseMessageContent,
  "embed-content": parseEmbedContent,
  "embed-header": parseEmbedHeader,
}
