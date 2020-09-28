function whiteNoise() {
  let noise = audio.createBufferSource()

  let bufferSize = audio.sampleRate

  let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
  let output = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }
  noise.buffer = buffer
}
