let audio = new (window.AudioContext || window.webkitAudioContext)({
  latencyHint: "interactive",
  sampleRate: 44100,
})

let tempo = 120.0
const bpmControl = document.getElementById("bpm")
const bpmValue = document.getElementById("bpm-value")
bpmControl.addEventListener(
  "input",
  function () {
    tempo = Number(this.value)

    bpmValue.textContent = tempo
  },
  false
)

// instrument pads

const pads = document.querySelectorAll(".sequencer-pads-container__pads")
const allPadBtns = document.querySelectorAll("#tracks button")

// change aria attribute on click on pads
allPadBtns.forEach((el) => {
  el.addEventListener(
    "click",
    () => {
      if (el.getAttribute("aria-checked") === "false") {
        el.setAttribute("aria-checked", "true")
      } else {
        el.setAttribute("aria-checked", "false")
      }
    },
    false
  )
})

// TODO find perfect mix between lookahead (how freqently scheduling function is called (in milliseconds))
// and scheduleAheadTime (How far ahead to schedule audio in seconds)
const lookahead = 15.0
const scheduleAheadTime = 0.1

let currentNote = 0
let nextNoteTime = 0.0
function nextNote() {
  const secondsPerBeat = 15 / tempo

  nextNoteTime += secondsPerBeat // Add beat length to last beat time

  // move up the beat number, and start over to zero
  currentNote++
  if (currentNote === 16) {
    currentNote = 0
  }
}

// array for the notes thats gonna be played, with the current time that they should play
const noteQueue = []

function scheduleNote(beatNumber, time) {
  noteQueue.push({ note: beatNumber, time: time })

  if (
    pads[0]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    kickMasterVol.connect(audio.destination)
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
  }
  if (
    pads[1]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    snareMasterVol.connect(audio.destination)
    snare1()
    instrumentHit(1)
  }
  if (
    pads[2]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    clapMasterVol.connect(audio.destination)
    clap1()
    instrumentHit(2)
  }
  if (
    pads[3]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    fingersnapMasterVol.connect(audio.destination)
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      fingersnapSoundFF()
    } else {
      fingersnapSound()
    }
    instrumentHit(3)
  }
  if (
    pads[4]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    hihatMasterVol.connect(audio.destination)
    hihat1()
    instrumentHit(4)
  }
  if (
    pads[5]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    cymbalMasterVol.connect(audio.destination)
    cymbal1()
    instrumentHit(5)
  }

  if (
    pads[6]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    lowtomMasterVol.connect(audio.destination)
    if (switchEnvBtn.checked == true) {
      lowtom1DeviceSpkr()
    } else {
      lowtom1()
    }
    instrumentHit(6)
  }

  if (
    pads[7]
      .querySelectorAll("button")
      [currentNote].getAttribute("aria-checked") === "true"
  ) {
    hitomMasterVol.connect(audio.destination)
    if (switchEnvBtn.checked == true) {
      hitom1DeviceSpkr()
    } else {
      hitom1()
    }
    instrumentHit(7)
  }
}

let timerID
function scheduler() {
  // schedule notes that will need to play before the next interval,
  // and advance the beat transport.
  while (nextNoteTime < audio.currentTime + scheduleAheadTime) {
    scheduleNote(currentNote, nextNoteTime)
    nextNote()
  }
  timerID = window.setTimeout(scheduler, lookahead)
}

let lastNoteDrawn = 3
function drawTrnsprt() {
  let drawNote = lastNoteDrawn
  const currentTime = audio.currentTime

  while (noteQueue.length && noteQueue[0].time < currentTime) {
    drawNote = noteQueue[0].note
    noteQueue.splice(0, 1) // remove note from queue
  }

  if (lastNoteDrawn !== drawNote) {
    pads.forEach((el) => {
      el.children[lastNoteDrawn].style.border = "2px solid rgb(151, 149, 148)"
      el.children[drawNote].style.border = "5px solid hsla(195, 98%, 55%, 1)"

      // display different color on pressed down notes when transport moves over them
      if (
        el.querySelectorAll("button")[drawNote].getAttribute("aria-checked") ===
        "true"
      ) {
        if (window.matchMedia("(min-width: 1000px)").matches) {
          el.children[drawNote].style.border =
            "1.75vw solid rgb(253, 83, 244, 0.400)"
        } else {
          el.children[drawNote].style.border =
            "2.4vw solid rgb(253, 83, 244, 0.400)"
        }
      }
    })

    lastNoteDrawn = drawNote
  }
  requestAnimationFrame(drawTrnsprt)
}

const playButton = document.querySelector("[data-playing]")
let isPlaying = false

playButton.addEventListener("click", (ev) => {
  isPlaying = !isPlaying

  if (isPlaying) {
    // start play

    // check if audiocontext is in suspended state
    if (audio.state === "suspended") {
      audio.resume()
    }
    // console.log(audio.state)
    // console.log(audio.baseLatency)
    currentNote = 0
    nextNoteTime = audio.currentTime
    scheduler()
    requestAnimationFrame(drawTrnsprt)
    ev.target.dataset.playing = "true"
  } else {
    window.clearTimeout(timerID)
    ev.target.dataset.playing = "false"

    kickMasterVol.disconnect(audio.destination)
    snareMasterVol.disconnect(audio.destination)
    clapMasterVol.disconnect(audio.destination)
    fingersnapMasterVol.disconnect(audio.destination)
    hihatMasterVol.disconnect(audio.destination)
    cymbalMasterVol.disconnect(audio.destination)
    lowtomMasterVol.disconnect(audio.destination)
    hitomMasterVol.disconnect(audio.destination)
  }
})
