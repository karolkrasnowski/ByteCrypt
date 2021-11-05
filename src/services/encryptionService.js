import CryptoJS from 'crypto-js'

export const encrypt = (file, password) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result)
      const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString()
      resolve(new Blob([encrypted]))
    }
    reader.readAsArrayBuffer(file)
  })
}

export const decrypt = (file, password) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const decrypted = CryptoJS.AES.decrypt(reader.result, password)
      const typedArray = wordArrayToUint8Array(decrypted)
      resolve(new Blob([typedArray]))
    }
    reader.readAsText(file)
  })
}

const wordArrayToUint8Array = (wordArray) => {
  const arrayOfWords = wordArray.hasOwnProperty('words') ? wordArray.words : []
  const length = wordArray.hasOwnProperty('sigBytes')
    ? wordArray.sigBytes
    : arrayOfWords.length * 4
  let uInt8Array = new Uint8Array(length),
    index = 0,
    word,
    i
  for (i = 0; i < length; i++) {
    word = arrayOfWords[i]
    uInt8Array[index++] = word >> 24
    uInt8Array[index++] = (word >> 16) & 0xff
    uInt8Array[index++] = (word >> 8) & 0xff
    uInt8Array[index++] = word & 0xff
  }
  return uInt8Array
}
