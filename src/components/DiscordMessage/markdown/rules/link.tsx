import React from "react"
import { defaultRules, unescapeUrl } from "simple-markdown"
import { depunycodeUrl } from "../helpers/depunycodeUrl"
import type { MarkdownRule } from "../parsers/MarkdownRule"

export const link: MarkdownRule = {
  ...defaultRules.link,
  parse: (capture, parse, state) => {
    const [, name, href, title] = capture

    const url = unescapeUrl(href)
    if (!/^https?:\/\//i.test(url)) return parse(name, state)

    const decoded = depunycodeUrl(url)
    if (!decoded) {
      return {
        type: "text",
        content: url,
      }
    }

    const target = decoded

    return {
      content: parse(name, state),
      target,
      title,
    }
  },
  react: (node, output, state) => (
    <a
      key={state.key}
      href={node.target}
      title={node.title}
      rel="noopener noreferrer nofollow ugc"
      target="_blank"
    >
      {output(node.content, state)}
    </a>
  ),
}
