const hihatMasterVol = audio.createGain()
const hihatBell = audio.createGain()
let hihatDecayTime = 40

hihatBtn.addEventListener("click", function () {
  hihat1()
  instrumentHit(4)
})

hihatVolCtrl.addEventListener(
  "input",
  function () {
    hihatMasterVol.gain.value = this.value
  },
  false
)

hihatBellCtrl.addEventListener(
  "input",
  function () {
    hihatBell.gain.value = this.value
  },
  false
)

hihatDecayCtrl.addEventListener(
  "input",
  function () {
    hihatDecayTime = this.value
  },
  false
)

function hihat1() {
  function hihatWhiteNoise() {
    let hhNoiseFilter = audio.createBiquadFilter()
    let noise = audio.createBufferSource()
    let bufferSize = audio.sampleRate
    let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    let output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    noise.buffer = buffer

    let attack = 15,
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + hihatDecayTime / 1000
    )

    hhNoiseFilter.type = "highpass"
    hhNoiseFilter.frequency.value = 7000

    gainStage1.gain.value = 1
    gainStage2.gain.value = hihatVolCtrl.value

    noise.connect(envelope)
    envelope.connect(hhNoiseFilter)
    hhNoiseFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(hihatMasterVol)
    hihatMasterVol.connect(audio.destination)
    noise.start(0)
    noise.stop(0 + hihatDecayTime)
  }

  function hhBell() {
    let attack = 0,
      decay = 15,
      bellFilter = audio.createBiquadFilter(),
      osc = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc.frequency.value = 4500
    osc.type = "sawtooth"
    bellFilter.type = "highpass"
    bellFilter.frequency.value = 500

    gainStage1.gain.value = 1
    gainStage2.gain.value = hihatVolCtrl.value
    hihatBell.gain.value = hihatBellCtrl.value

    osc.connect(envelope)
    envelope.connect(bellFilter)
    bellFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(hihatBell)
    hihatBell.connect(hihatMasterVol)
    hihatMasterVol.connect(audio.destination)

    osc.start(0)
    osc.stop(audio.currentTime + decay)
  }

  hihatWhiteNoise()
  hhBell()
}
