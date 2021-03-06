const lowtomMasterVol = audio.createGain()
const lowtomClick = audio.createGain()
let lowtomDecayTime = 150

lowtomBtn.addEventListener("click", function () {
  if (switchEnvBtn.checked == true) {
    lowtom1DeviceSpkr()
  } else {
    lowtom1()
  }

  instrumentHit(6)
})

lowtomVolumeCtrl.addEventListener("input", function () {}, false)

lowtomClickCtrl.addEventListener("input", function () {}, false)

lowtomDecayCtrl.addEventListener(
  "input",
  function () {
    lowtomDecayTime = this.value
  },
  false
)

function lowtom1() {
  function low() {
    let attack = 30,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)

    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + lowtomDecayTime / 1000
    )
    osc1.frequency.value = 110
    osc1.type = "sine"
    gainStage.gain.value = 1
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(lowtomMasterVol)

    osc1.start(0)
    //osc1.stop(0 + lowtomDecayTime)
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

    osc2.frequency.value = 180
    osc2.type = "sine"
    gainStage.gain.value = 1
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(lowtomMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let lowtomHpF = audio.createBiquadFilter()
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
    lowtomHpF.type = "highpass"
    lowtomHpF.frequency.value = 8000

    gainStage.gain.value = 1
    lowtomClick.gain.value = lowtomClickCtrl.value
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc3.connect(envelope)
    envelope.connect(lowtomHpF)
    lowtomHpF.connect(gainStage)
    gainStage.connect(lowtomClick)
    lowtomClick.connect(lowtomMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
  lowtomMasterVol.connect(audio.destination)
}

// -------LOTOM_DEVICE_SPEAKER-------
function lowtom1DeviceSpkr() {
  function low() {
    let attack = 40,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)

    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + lowtomDecayTime / 1000
    )
    osc1.frequency.value = 210
    osc1.type = "sine"
    gainStage.gain.value = 1
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(lowtomMasterVol)

    osc1.start(0)
    //osc1.stop(0 + lowtomDecayTime)
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

    osc2.frequency.value = 210
    osc2.type = "sine"
    gainStage.gain.value = 2
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(lowtomMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let lowtomHpF = audio.createBiquadFilter()
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
    lowtomHpF.type = "highpass"
    lowtomHpF.frequency.value = 8000

    gainStage.gain.value = 3
    lowtomClick.gain.value = lowtomClickCtrl.value
    lowtomMasterVol.gain.value = lowtomVolumeCtrl.value

    osc3.connect(envelope)
    envelope.connect(lowtomHpF)
    lowtomHpF.connect(gainStage)
    gainStage.connect(lowtomClick)
    lowtomClick.connect(lowtomMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
  lowtomMasterVol.connect(audio.destination)
}
