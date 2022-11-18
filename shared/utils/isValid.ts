export default function isValid(val: any) {
  return typeof val !== 'undefined' && val !== null && val !== ''
}