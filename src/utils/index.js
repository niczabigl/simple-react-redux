function goBack () {
  console.log('BACK!')
  return window.history.back()
}

function goExit () {
  console.log('EXIT!!')
  return window.close()
}

function print () {
  console.log('print!!')
  return window.print()
}

function goDetails () {
  console.log('DETAILS!!')
}

export { goBack, goExit, print, goDetails }
