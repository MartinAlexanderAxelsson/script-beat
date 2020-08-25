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

lowtomVolumeCtrl.addEventListener(
  "input",
  function () {
    lowtomMasterVol.gain.value = this.value
  },
  false
)

lowtomClickCtrl.addEventListener(
  "input",
  function () {
    lowtomClick.gain.value = this.value
  },
  false
)

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
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)

    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + lowtomDecayTime / 1000
    )
    osc1.frequency.value = 110
    osc1.type = "sine"
    gainStage1.gain.value = 1
    gainStage2.gain.value = lowtomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc1.start(0)
    osc1.stop(0 + lowtomDecayTime)
  }

  function mid() {
    let attack = 0,
      decay = 10,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 180
    osc2.type = "sine"
    gainStage1.gain.value = 1
    gainStage2.gain.value = lowtomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let lowtomHpF = audio.createBiquadFilter()
    let attack = 0,
      decay = 4,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 1000
    osc3.type = "sine"
    lowtomHpF.type = "highpass"
    lowtomHpF.frequency.value = 8000

    gainStage1.gain.value = 1
    gainStage2.gain.value = lowtomVolumeCtrl.value
    lowtomClick.gain.value = lowtomClickCtrl.value

    osc3.connect(envelope)
    envelope.connect(lowtomHpF)
    lowtomHpF.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomClick)
    lowtomClick.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
}

// -------LOTOM_DEVICE_SPEAKER-------
function lowtom1DeviceSpkr() {
  function low() {
    let attack = 40,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)

    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + lowtomDecayTime / 1000
    )
    osc1.frequency.value = 210
    osc1.type = "sine"
    gainStage1.gain.value = 1
    gainStage2.gain.value = lowtomVolumeCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc1.start(0)
    osc1.stop(0 + lowtomDecayTime)
  }

  function mid() {
    let attack = 0,
      decay = 10,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    // if browser is firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      decay = 40
    }

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 210
    osc2.type = "sine"
    gainStage1.gain.value = 2
    gainStage2.gain.value = lowtomVolumeCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let lowtomHpF = audio.createBiquadFilter()
    let attack = 0,
      decay = 4,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

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

    gainStage1.gain.value = 3
    gainStage2.gain.value = lowtomVolumeCtrl.value
    lowtomClick.gain.value = lowtomClickCtrl.value

    osc3.connect(envelope)
    envelope.connect(lowtomHpF)
    lowtomHpF.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(lowtomClick)
    lowtomClick.connect(lowtomMasterVol)
    lowtomMasterVol.connect(audio.destination)
    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
}
