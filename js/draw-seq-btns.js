const kickTrack = document.getElementById("kickdrum-pads")
const snareTrack = document.getElementById("snaredrum-pads")
const clapTrack = document.getElementById("clap-pads")
const fingersnapTrack = document.getElementById("fingersnap-pads")
const hihatTrack = document.getElementById("hihat-pads")
const cymbalTrack = document.getElementById("cymbal-pads")
const lowtomTrack = document.getElementById("lowtom-pads")
const hitomTrack = document.getElementById("hitom-pads")

for (let i = 0; i < 16; i++) {
  const kickPads = document.createElement("button")
  kickPads.addEventListener("click", handleClickEvent, false)
  kickPads.role = "switch"

  const snarePads = document.createElement("button")
  snarePads.addEventListener("click", handleClickEvent, false)
  snarePads.role = "switch"

  const clapPads = document.createElement("button")
  clapPads.addEventListener("click", handleClickEvent, false)
  clapPads.role = "switch"

  const fingersnapPads = document.createElement("button")
  fingersnapPads.addEventListener("click", handleClickEvent, false)
  fingersnapPads.role = "switch"

  const hihatPads = document.createElement("button")
  hihatPads.addEventListener("click", handleClickEvent, false)
  hihatPads.role = "switch"

  const cymbalPads = document.createElement("button")
  cymbalPads.addEventListener("click", handleClickEvent, false)
  cymbalPads.role = "switch"

  const lowtomPads = document.createElement("button")
  lowtomPads.addEventListener("click", handleClickEvent, false)
  lowtomPads.role = "switch"

  const hitomPads = document.createElement("button")
  hitomPads.addEventListener("click", handleClickEvent, false)
  hitomPads.role = "switch"

  function handleClickEvent(evt) {
    let el = evt.target

    if (el.getAttribute("aria-checked") == "true") {
      el.setAttribute("aria-checked", "false")
    } else {
      el.setAttribute("aria-checked", "true")
    }
  }

  kickTrack.appendChild(kickPads)
  snareTrack.appendChild(snarePads)
  clapTrack.appendChild(clapPads)
  fingersnapTrack.appendChild(fingersnapPads)
  hihatTrack.appendChild(hihatPads)
  cymbalTrack.appendChild(cymbalPads)
  lowtomTrack.appendChild(lowtomPads)
  hitomTrack.appendChild(hitomPads)
}
