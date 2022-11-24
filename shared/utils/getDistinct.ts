export default function getDistinct(arr: Array<any>, distinctValue: any) {
  return arr
    ? [...new Set(arr.map((t) => t[distinctValue]))].filter(Boolean)
    : [];
}
