const EMOJI_CDN_BASE_URL = "https://twemoji.maxcdn.com/v/13.0.1/svg"

export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(character => character.codePointAt(0)?.toString(16))
    // Twemoji does not include "\uFE0F" (VARIATION SELECTOR) in their file names
    // if the emoji does not contain "\u200D" (ZERO WIDTH JOINER)
    .filter((item, index, array) => array.includes("200d") || item !== "fe0f")
    .join("-")

  return `${EMOJI_CDN_BASE_URL}/${file}.svg`
}
