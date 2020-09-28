const hitomMasterVol = audio.createGain()
const hitomClick = audio.createGain()
let hitomDecayTime = 140

hitomBtn.addEventListener("click", function () {
  if (switchEnvBtn.checked == true) {
    hitom1DeviceSpkr()
  } else {
    hitom1()
  }
  instrumentHit(7)
})

hitomVolumeCtrl.addEventListener("input", function () {}, false)

hitomClickCtrl.addEventListener("input", function () {}, false)

hitomDecayCtrl.addEventListener(
  "input",
  function () {
    hitomDecayTime = this.value
  },
  false
)

// ------------HITOM_HEAPHONES-------------
function hitom1() {
  function low() {
    let attack = 40,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + hitomDecayTime / 1000
    )
    osc1.frequency.value = 160
    osc1.type = "sine"
    gainStage.gain.value = 1
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(hitomMasterVol)

    osc1.start(0)
    //osc1.stop(0 + hitomDecayTime)
  }

  function mid() {
    let attack = 0,
      decay = 10,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 200
    osc2.type = "sine"
    gainStage.gain.value = 1
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(hitomMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let hitomHpF = audio.createBiquadFilter()
    let attack = 0,
      decay = 4,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 1000
    osc3.type = "sine"
    hitomHpF.type = "highpass"
    hitomHpF.frequency.value = 8000

    gainStage.gain.value = 1
    hitomClick.gain.value = hitomClickCtrl.value
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc3.connect(envelope)
    envelope.connect(hitomHpF)
    hitomHpF.connect(gainStage)
    gainStage.connect(hitomClick)
    hitomClick.connect(hitomMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }

  low()
  mid()
  top()
  hitomMasterVol.connect(audio.destination)
}

// ------------HITOM_DEVICE_SPEAKER-------------

function hitom1DeviceSpkr() {
  function low() {
    let attack = 40,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + hitomDecayTime / 1000
    )
    osc1.frequency.value = 250
    osc1.type = "sine"
    gainStage.gain.value = 1
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(hitomMasterVol)

    osc1.start(0)
    //osc1.stop(0 + hitomDecayTime)
  }

  function mid() {
    let attack = 0,
      decay = 10,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    // if browser is firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      decay = 40
    }

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 250
    osc2.type = "sine"
    gainStage.gain.value = 2
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(hitomMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let hitomHpF = audio.createBiquadFilter()
    let attack = 0,
      decay = 4,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    // if browser is firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      decay = 30
    }

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 1000
    osc3.type = "sine"
    hitomHpF.type = "highpass"
    hitomHpF.frequency.value = 8000

    gainStage.gain.value = 3
    hitomClick.gain.value = hitomClickCtrl.value
    hitomMasterVol.gain.value = hitomVolumeCtrl.value

    osc3.connect(envelope)
    envelope.connect(hitomHpF)
    hitomHpF.connect(gainStage)
    gainStage.connect(hitomClick)
    hitomClick.connect(hitomMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }

  low()
  mid()
  top()
  hitomMasterVol.connect(audio.destination)
}
