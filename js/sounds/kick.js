const kickMasterVol = audio.createGain()
const kickClick = audio.createGain()
let kickDecayTime = 250

kickBtn.addEventListener("click", function () {
  if (switchEnvBtn.checked == true) {
    kickDeviceSpkr()
  } else {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      kickHeadphonesFF()
    } else {
      kickHeadphones()
    }
  }
  instrumentHit(0)
})

kickVolCtrl.addEventListener("input", function () {}, false)

kickClickCtrl.addEventListener("input", function () {}, false)

kickDecayCtrl.addEventListener(
  "input",
  function () {
    kickDecayTime = Number(this.value)
    // kickDecayTimeDeviceSpkr = this.value
  },
  false
)

//---------------KICK_HEADPHONES---------------

function kickHeadphones() {
  function low() {
    let attack = 40,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + kickDecayTime / 1000
    )

    osc1.frequency.value = 50
    osc1.type = "sine"
    gainStage.gain.value = 1
    kickMasterVol.gain.value = kickVolCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc1.start(0)

    //osc1.stop(0 + kickDecayTime)
  }

  function mid() {
    let attack = 0,
      decay = 30,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 120
    osc2.type = "sine"
    gainStage.gain.value = 1
    kickMasterVol.gain.value = kickVolCtrl.value

    osc2.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let kickHpF = audio.createBiquadFilter()

    let attack = 0,
      decay = 5,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 800
    osc3.type = "sine"
    kickHpF.type = "highpass"
    kickHpF.frequency.value = 8000

    gainStage.gain.value = 2
    kickMasterVol.gain.value = kickVolCtrl.value
    kickClick.gain.value = kickClickCtrl.value

    osc3.connect(envelope)
    envelope.connect(kickHpF)
    kickHpF.connect(gainStage)
    gainStage.connect(kickClick)
    kickClick.connect(kickMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
  kickMasterVol.connect(audio.destination)
}

//----------------KICK_HEADPHONES_FIREFOX--------------

function kickHeadphonesFF() {
  function low() {
    let attack = 75,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(
      0,
      audio.currentTime + kickDecayTime / 1000
    )

    osc1.frequency.value = 50
    osc1.type = "sine"
    gainStage.gain.value = 1
    kickMasterVol.gain.value = kickVolCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc1.start(0)
    //osc1.stop(0 + kickDecayTime)
  }

  function mid() {
    let lowpass = audio.createBiquadFilter()
    let attack = 10,
      decay = 50,
      osc2 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    lowpass.frequency.value = 1200
    lowpass.type = "lowpass"
    osc2.frequency.value = 120
    osc2.type = "sine"
    gainStage.gain.value = 1
    kickMasterVol.gain.value = kickVolCtrl.value

    osc2.connect(envelope)
    envelope.connect(lowpass)
    lowpass.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let highpass = audio.createBiquadFilter()
    let filterOutFreq = audio.createBiquadFilter()
    let attenuateFreq = audio.createBiquadFilter()
    highpass.type = "highpass"
    highpass.frequency.value = 8000

    filterOutFreq.type = "bandpass"
    filterOutFreq.frequency.value = 1200
    attenuateFreq.type = "notch"
    attenuateFreq.frequency.value = 800

    let attack = 0,
      decay = 30,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 800
    osc3.type = "sine"
    gainStage.gain.value = 15
    kickMasterVol.gain.value = kickVolCtrl.value

    kickClick.gain.value = kickClickCtrl.value

    osc3.connect(envelope)
    envelope.connect(highpass)
    highpass.connect(filterOutFreq)
    filterOutFreq.connect(attenuateFreq)
    attenuateFreq.connect(gainStage)

    gainStage.connect(kickClick)
    kickClick.connect(kickMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }
  low()
  mid()
  top()
  kickMasterVol.connect(audio.destination)
}

//-------------------KICK_DEVICE_SPEAKER-----------------

function kickDeviceSpkr() {
  function low() {
    let attack = 0,
      decay = 50,
      osc1 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc1.frequency.value = 120
    osc1.type = "sine"
    gainStage.gain.value = 2
    kickMasterVol.gain.value = kickVolCtrl.value

    osc1.connect(envelope)
    envelope.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc1.start(0)
    osc1.stop(audio.currentTime + decay)
  }

  function mid() {
    let attack = 0,
      decay = 20,
      osc2 = audio.createOscillator(),
      envelope2 = audio.createGain(),
      gainStage = audio.createGain()

    // if browser is firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      decay = 30
    }

    envelope2.gain.setValueAtTime(0, audio.currentTime)
    envelope2.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope2.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc2.frequency.value = 160
    osc2.type = "sine"
    gainStage.gain.value = 0.5
    kickMasterVol.gain.value = kickVolCtrl.value

    osc2.connect(envelope2)
    envelope2.connect(gainStage)
    gainStage.connect(kickMasterVol)

    osc2.start(0)
    osc2.stop(audio.currentTime + decay)
  }

  function top() {
    let highpass = audio.createBiquadFilter()
    highpass.type = "highpass"
    highpass.frequency.value = 4000
    let attack = 0,
      decay = 10,
      osc3 = audio.createOscillator(),
      envelope = audio.createGain(),
      gainStage = audio.createGain()

    // if browser is firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      decay = 40
      gainStage.gain.value = 4
    }
    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    osc3.frequency.value = 1000
    osc3.type = "sine"
    gainStage.gain.value = 1
    kickMasterVol.gain.value = kickVolCtrl.value
    kickClick.gain.value = kickClickCtrl.value

    osc3.connect(envelope)
    envelope.connect(highpass)
    highpass.connect(gainStage)

    gainStage.connect(kickClick)
    kickClick.connect(kickMasterVol)

    osc3.start(0)
    osc3.stop(audio.currentTime + decay)
  }

  low()
  mid()
  top()
  kickMasterVol.connect(audio.destination)
}
