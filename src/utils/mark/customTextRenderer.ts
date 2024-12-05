export const customTextRenderer = ({ str, itemIndex }) => {
  return str
    .split(' ')
    .map(
      (word, index) =>
        `<mark id="word-${itemIndex}-${index}" class="text-foreground bg-background cursor-pointer hover:bg-primary hover:text-primary-foreground">${word}</mark>`
    )
    .join(' ')
}
