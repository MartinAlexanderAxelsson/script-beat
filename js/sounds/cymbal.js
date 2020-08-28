const cymbalMasterVol = audio.createGain()
const cymbalBell = audio.createGain()
let cymbalDecayTime = 1000

cymbalBtn.addEventListener("click", function () {
  cymbalMasterVol.connect(audio.destination)
  cymbal1()
  instrumentHit(5)
})

cymbalVolCtrl.addEventListener(
  "input",
  function () {
    cymbalMasterVol.gain.value = this.value
  },
  false
)

cymbalBellCtrl.addEventListener(
  "input",
  function () {
    cymbalBell.gain.value = this.value
  },
  false
)

cymbalDecayCtrl.addEventListener(
  "input",
  function () {
    cymbalDecayTime = this.value
  },
  false
)

function cymbal1() {
  function cymbalWhiteNoise() {
    let noise = audio.createBufferSource()
    let cymbalHpFilter = audio.createBiquadFilter()
    let bufferSize = audio.sampleRate
    let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    let output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    noise.buffer = buffer
    let attack = 0,
      decay = 10,
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    cymbalHpFilter.type = "highpass"
    cymbalHpFilter.frequency.value = 8000

    gainStage1.gain.value = 2
    gainStage2.gain.value = hihatVolCtrl.value

    noise.connect(envelope)
    envelope.connect(cymbalHpFilter)
    cymbalHpFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(cymbalMasterVol)

    noise.start(0)
    noise.stop(audio.currentTime + decay)
  }

  function ring() {
    let fundamental = 40
    //let ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]
    let ratios = [0.5, 1, 2.16, 3.43, 4.79, 5.21]

    let attack = 0,
      hPFilter = audio.createBiquadFilter(),
      bPFilter = audio.createBiquadFilter(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + cymbalDecayTime / 1000
    )

    // osc.frequency.value = 4500
    // osc.type = "square"
    hPFilter.type = "highpass"
    hPFilter.frequency.value = 12000
    bPFilter.type = "bandpass"
    bPFilter.frequency.value = 8000

    gainStage1.gain.value = 3
    gainStage2.gain.value = cymbalVolCtrl.value

    ratios.forEach(function (ratio) {
      let osc4 = audio.createOscillator()
      osc4.type = "square"
      osc4.frequency.value = fundamental * ratio

      osc4.connect(envelope)
      envelope.connect(hPFilter)
      hPFilter.connect(bPFilter)
      bPFilter.connect(gainStage1)
      gainStage1.connect(gainStage2)
      gainStage2.connect(cymbalMasterVol)

      osc4.start(0)
      //   osc4.stop(0 + cymbalDecayTime)
    })
  }

  function bell() {
    let attack = 0,
      decay = 20,
      bellFilter = audio.createBiquadFilter(),
      osc = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc.frequency.value = 5000
    osc.type = "sawtooth"
    bellFilter.type = "highpass"
    bellFilter.frequency.value = 8000

    gainStage1.gain.value = 1
    gainStage2.gain.value = cymbalVolCtrl.value

    osc.connect(envelope)
    envelope.connect(bellFilter)
    bellFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(cymbalBell)
    cymbalBell.connect(cymbalMasterVol)

    osc.start(0)
    osc.stop(audio.currentTime + decay)
  }

  cymbalWhiteNoise()
  ring()
  bell()
}
