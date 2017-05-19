export const decodeURL = (s) => {
  return s.replace(/\*/g, '%2A')
    .replace(/#/g, '%23')
    .replace(/\$/g, '%24')
    .replace(/%/g, '%25')
    .replace(/!/g, '%21')
    .replace(/\^/g, '%5E')
}