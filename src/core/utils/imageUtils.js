const imageExists = url => {
  return new Promise(function (resolve, reject) {
    /* eslint-disable */
    // Image is part of DOM and not ECMAScript
    let img = new Image()
    /* eslint-enable */
    img.onload = function () {
      resolve(true)
    }
    img.onerror = function () {
      reject(false) // eslint-disable-line
    }
    img.src = url
  })
}

export default {
  imageExists
}
