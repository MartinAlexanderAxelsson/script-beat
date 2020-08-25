let fingersnapMasterVol = audio.createGain()
let fSnapReverbGain = audio.createGain()
let fSnapReverb = audio.createConvolver()
let fSnapImpulse = "impulseresponseheslingtonchurch-002.wav"
let fSnapReverbFilter = audio.createBiquadFilter()
fSnapReverbFilter.type = "lowpass"
fSnapReverbFilter.frequency.value = 3000
let fSnapFilter = audio.createBiquadFilter()
fSnapFilter.type = "lowpass"

fingersnapBtn.addEventListener("click", function () {
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    fingersnapSoundFF()
  } else {
    fingersnapSound()
  }
  instrumentHit(3)
})

fingersnapVolCtrl.addEventListener(
  "input",
  function () {
    fingersnapMasterVol.gain.value = this.value
  },
  false
)

fSnapFilterCtrl.addEventListener(
  "input",
  function () {
    fSnapFilter.frequency.value = this.value
  },
  false
)

fSnapReverbCtrl.addEventListener(
  "input",
  function () {
    fSnapReverbGain.gain.value = this.value
  },
  false
)

function fingersnapSound() {
  function fsnapWhiteNoise() {
    let noise = audio.createBufferSource()

    var bufferSize = audio.sampleRate
    var buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    var output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    noise.buffer = buffer
    let attack = 0,
      decay = 8,
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    gainStage1.gain.value = 2
    gainStage2.gain.value = fingersnapVolCtrl.value

    noiseFilter = audio.createBiquadFilter()
    noiseFilter.type = "highpass"
    noiseFilter.frequency.value = 7000
    fSnapFilter.frequency.value = fSnapFilterCtrl.value

    noise.connect(envelope)
    envelope.connect(noiseFilter)
    noiseFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(fSnapFilter)
    gainStage2.connect(fSnapReverbGain)
    fSnapFilter.connect(fingersnapMasterVol)
    fingersnapMasterVol.connect(audio.destination)
    noise.start(0)
    noise.stop(audio.currentTime + decay)
  }
  fsnapWhiteNoise()

  setTimeout(function () {
    function fsnapOsc() {
      let fsnapHpF = audio.createBiquadFilter()
      let attack = 0,
        decay = 5,
        osc = audio.createOscillator(),
        envelope = audio.createGain(),
        gainStage1 = audio.createGain(),
        gainStage2 = audio.createGain()

      envelope.gain.setValueAtTime(0, audio.currentTime)
      envelope.gain.linearRampToValueAtTime(
        1,
        audio.currentTime + attack / 1000
      )
      envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

      osc.frequency.value = 3000
      osc.type = "sawtooth"
      fsnapHpF.type = "highpass"
      fsnapHpF.frequency.value = 8000

      gainStage1.gain.value = 2
      gainStage2.gain.value = fingersnapVolCtrl.value
      fSnapFilter.frequency.value = fSnapFilterCtrl.value

      osc.connect(envelope)
      envelope.connect(fsnapHpF)
      fsnapHpF.connect(gainStage1)
      gainStage1.connect(gainStage2)
      gainStage2.connect(fSnapReverbGain)
      gainStage2.connect(fSnapFilter)
      fSnapFilter.connect(fingersnapMasterVol)
      fingersnapMasterVol.connect(audio.destination)
      osc.start(0)
      osc.stop(audio.currentTime + decay)
    }
    fsnapOsc()
  }, 25)
}

function getImpulseFsnap() {
  ajaxReqFsnap = new XMLHttpRequest()
  ajaxReqFsnap.open("GET", fSnapImpulse, true)
  ajaxReqFsnap.responseType = "arraybuffer"

  ajaxReqFsnap.onload = function () {
    let impulseData = ajaxReqFsnap.response

    audio.decodeAudioData(
      impulseData,
      function (buffer) {
        impulseBuffer = buffer
        fSnapReverb.buffer = impulseBuffer
        fSnapReverb.normalize = true
        fSnapReverbGain.gain.value = fSnapReverbCtrl.value
        fSnapReverbGain.connect(fSnapReverbFilter)
        fSnapReverbFilter.connect(fSnapReverb)
        fSnapReverb.connect(fingersnapMasterVol)
      },

      function (e) {
        "Error with decoding audio data" + e.err
      }
    )
  }

  ajaxReqFsnap.send()
}

getImpulseFsnap()

//-------------FINGERSNAP_FIREFOX--------------

function fingersnapSoundFF() {
  function fsnapWhiteNoiseFF() {
    let noise = audio.createBufferSource()

    var bufferSize = audio.sampleRate
    var buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    var output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    noise.buffer = buffer
    let attack = 0,
      decay = 30,
      envelope = audio.createGain(),
      gainStage1 = audio.createGain(),
      gainStage2 = audio.createGain()

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000)
    envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

    gainStage1.gain.value = 5
    gainStage2.gain.value = fingersnapVolCtrl.value

    let noiseFilter = audio.createBiquadFilter()
    noiseFilter.type = "highpass"
    noiseFilter.frequency.value = 14000
    fSnapFilter.frequency.value = fSnapFilterCtrl.value

    noise.connect(envelope)
    envelope.connect(noiseFilter)
    noiseFilter.connect(gainStage1)
    gainStage1.connect(gainStage2)
    gainStage2.connect(fSnapFilter)
    gainStage2.connect(fSnapReverbGain)
    fSnapFilter.connect(fingersnapMasterVol)
    fingersnapMasterVol.connect(audio.destination)
    noise.start(0)
    noise.stop(audio.currentTime + decay)
  }
  fsnapWhiteNoiseFF()

  setTimeout(function () {
    function fsnapOscFF() {
      let fsnapHpF = audio.createBiquadFilter()
      let attack = 0,
        decay = 20,
        osc = audio.createOscillator(),
        envelope = audio.createGain(),
        gainStage1 = audio.createGain(),
        gainStage2 = audio.createGain()

      envelope.gain.setValueAtTime(0, audio.currentTime)
      envelope.gain.linearRampToValueAtTime(
        1,
        audio.currentTime + attack / 1000
      )
      envelope.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000)

      osc.frequency.value = 3000
      osc.type = "sawtooth"
      fsnapHpF.type = "highpass"
      fsnapHpF.frequency.value = 10000

      gainStage1.gain.value = 6
      gainStage2.gain.value = fingersnapVolCtrl.value
      fSnapFilter.frequency.value = fSnapFilterCtrl.value

      osc.connect(envelope)
      envelope.connect(fsnapHpF)
      fsnapHpF.connect(gainStage1)
      gainStage1.connect(gainStage2)
      gainStage2.connect(fSnapReverbGain)
      gainStage2.connect(fSnapFilter)
      fSnapFilter.connect(fingersnapMasterVol)
      fingersnapMasterVol.connect(audio.destination)
      osc.start(0)
      osc.stop(audio.currentTime + decay)
    }
    fsnapOscFF()
  }, 30)
}
