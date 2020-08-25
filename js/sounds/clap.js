let clapMasterVol = audio.createGain()
let clapDecayTime = 60
let clapTone = audio.createBiquadFilter()
clapTone.type = "lowpass"
let clapReverbGain = audio.createGain()
let clapReverb = audio.createConvolver()
let clapImpulse = "impulseresponseheslingtonchurch-002.wav"
let clapReverbFilter = audio.createBiquadFilter()
clapReverbFilter.type = "lowpass"
clapReverbFilter.frequency.value = 3000

clapBtn.addEventListener("click", function () {
  clap1()
  instrumentHit(2)
})

clapVolCtrl.addEventListener(
  "input",
  function () {
    clapMasterVol.gain.value = this.value
  },
  false
)

clapToneCtrl.addEventListener(
  "input",
  function () {
    clapTone.frequency.value = this.value
  },
  false
)

clapDecayCtrl.addEventListener(
  "input",
  function () {
    clapDecayTime = this.value
  },
  false
)

function clap1() {
  function clapWhiteNoise() {
    let clapHpF = audio.createBiquadFilter()
    let noise = audio.createBufferSource()
    let bufferSize = audio.sampleRate
    let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    let output = buffer.getChannelData(0)

    for (var i = 0; i < bufferSize; i++) {
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
      audio.currentTime + clapDecayTime / 1000
    )

    clapHpF.type = "highpass"
    clapHpF.frequency.value = 1000
    clapTone.frequency.value = clapToneCtrl.value
    gainStage.gain.value = clapVolCtrl.value

    noise.connect(envelope)
    envelope.connect(clapHpF)
    clapHpF.connect(gainStage)
    gainStage.connect(clapTone)
    gainStage.connect(clapReverbGain)
    clapTone.connect(clapMasterVol)
    clapMasterVol.connect(audio.destination)
    noise.start(0)
    noise.stop(0 + clapDecayTime)
  }
  clapWhiteNoise()

  setTimeout(function () {
    function clapWhiteNoise2() {
      let clapHpF2 = audio.createBiquadFilter()
      let noise = audio.createBufferSource()
      var bufferSize = audio.sampleRate
      var buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
      var output = buffer.getChannelData(0)

      for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      noise.buffer = buffer

      let attack = 0,
        envelope = audio.createGain(),
        gainStage = audio.createGain()

      envelope.gain.setValueAtTime(0, audio.currentTime)
      envelope.gain.linearRampToValueAtTime(
        1,
        audio.currentTime + attack / 1000
      )
      envelope.gain.linearRampToValueAtTime(
        0,
        audio.currentTime + clapDecayTime / 1000
      )

      clapHpF2.type = "highpass"
      clapHpF2.frequency.value = 2000
      clapTone.frequency.value = clapToneCtrl.value
      gainStage.gain.value = clapVolCtrl.value

      noise.connect(envelope)
      envelope.connect(clapHpF2)
      clapHpF2.connect(gainStage)
      gainStage.connect(clapTone)
      gainStage.connect(clapReverbGain)
      clapTone.connect(clapMasterVol)
      clapMasterVol.connect(audio.destination)
      noise.start(0)
      noise.stop(0 + clapDecayTime)
    }
    clapWhiteNoise2()
  }, 10)
}

function getImpulseClap() {
  ajaxReqClap = new XMLHttpRequest()
  ajaxReqClap.open("GET", clapImpulse, true)
  ajaxReqClap.responseType = "arraybuffer"

  ajaxReqClap.onload = function () {
    let impulseData = ajaxReqClap.response

    audio.decodeAudioData(
      impulseData,
      function (buffer) {
        impulseBuffer = buffer
        clapReverb.buffer = impulseBuffer
        clapReverb.normalize = true
        clapReverbGain.gain.value = 0.1
        clapReverbGain.connect(clapReverbFilter)
        clapReverbFilter.connect(clapReverb)
        clapReverb.connect(clapMasterVol)
      },

      function (e) {
        "Error with decoding audio data" + e.err
      }
    )
  }

  ajaxReqClap.send()
}

getImpulseClap()
