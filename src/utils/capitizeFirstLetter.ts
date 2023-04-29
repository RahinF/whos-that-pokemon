export default function capitizeFirstLetter(word: string) {
  return word.split('')[0].toUpperCase() + word.substring(1);
}
