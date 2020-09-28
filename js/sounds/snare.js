const snareMasterVol = audio.createGain()
const snareSnap = audio.createGain()
let snareDecayTime = 100

snareBtn.addEventListener("click", function () {
  snare1()
  instrumentHit(1)
})

snareVolCtrl.addEventListener(
  "input",
  function () {
    // snareMasterVol.gain.value = this.value
  },
  false
)

snareSnapCtrl.addEventListener(
  "input",
  function () {
    // snareSnap.gain.value = this.value
  },
  false
)

snareDecayCtrl.addEventListener(
  "input",
  function () {
    snareDecayTime = this.value
  },
  false
)

function snare1() {
  function snareWhiteNoise() {
    let noise = audio.createBufferSource()
    
    let bufferSize = audio.sampleRate
    
    let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    let output = buffer.getChannelData(0)
 

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
    noise.buffer = buffer
    let attack = 0,
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)

    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + snareDecayTime / 1000
    )
    gainStage.gain.value = 0.5
    snareMasterVol.gain.value = snareVolCtrl.value

    let snareNoiseFilter = audio.createBiquadFilter()
    snareNoiseFilter.type = "lowpass"
    snareNoiseFilter.frequency.value = 4000

    noise.connect(envelope)
    envelope.connect(snareNoiseFilter)
    snareNoiseFilter.connect(gainStage)
    gainStage.connect(snareMasterVol)

    noise.start(0)
    //noise.stop(0 + snareDecayTime)
  }

  function smack() {
    let snareHpF = audio.createBiquadFilter()
    var attack = 0,
      decay = 5,
      osc = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc.frequency.value = 300
    osc.type = "square"
    snareHpF.type = "highpass"
    snareHpF.frequency.value = 1300

    gainStage.gain.value = 1
    snareSnap.gain.value = snareSnapCtrl.value
    snareMasterVol.gain.value = snareVolCtrl.value

    osc.connect(envelope)
    envelope.connect(snareHpF)
    snareHpF.connect(gainStage)
    gainStage.connect(snareSnap)
    snareSnap.connect(snareMasterVol)

    osc.start(0)
    osc.stop(audio.currentTime + decay)
  }
  function body() {
    let snareHpF2 = audio.createBiquadFilter()
    var attack = 0,
      decay = 80,
      osc = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    snareHpF2.type = "highpass"
    snareHpF2.frequency.value = 700
    osc.frequency.value = 300
    osc.type = "sine"

    gainStage.gain.value = 3
    snareSnap.gain.value = snareSnapCtrl.value
    snareMasterVol.gain.value = snareVolCtrl.value

    osc.connect(envelope)
    envelope.connect(snareHpF2)
    snareHpF2.connect(gainStage)
    gainStage.connect(snareSnap)
    snareSnap.connect(snareMasterVol)

    osc.start(0)
    osc.stop(audio.currentTime + decay)
  }

  snareWhiteNoise()
  smack()
  body()
  snareMasterVol.connect(audio.destination)
}
