// textcolor change when switch between headphones and devicespeaker sounds

switchEnvBtn.addEventListener("click", function () {
  if (switchEnvBtn.checked != true) {
    laptop.style.color = "var(--lightGrey)"
    headphones.style.color = "#21a6f3"
  }
  if (switchEnvBtn.checked != false) {
    laptop.style.color = "#21a6f3"
    headphones.style.color = "var(--lightGrey)"
  }
})

// instrumenttrack "flash" when their instrumentbutton and sequencernote is hit (only in desktop)

function instrumentHit(nr) {
  instrumentTrack[nr].style.background = "var(--trackFlashColor)"
  setTimeout(function () {
    instrumentTrack[nr].style.background = "var(--trackColor3)"
  }, 80)
}

// Clear all patterns
document.getElementById("clear-btn").onclick = function () {
  location.reload()
}

// Fill range sliders for chrome

document.getElementById("bpm").oninput = function () {
  this.style.background =
    "linear-gradient(to right, var(--btnBlue) 0%, var(--btnBlue) " +
    ((this.value - this.min) / (this.max - this.min)) * 100 +
    "%, var(--lightGrey) " +
    ((this.value - this.min) / (this.max - this.min)) * 100 +
    "%, var(--lightGrey) 100%)"
}

document.querySelectorAll(".range-input").forEach((el) => {
  el.oninput = function () {
    this.style.background =
      "linear-gradient(to right, var(--btnBlue) 0%, var(--btnBlue) " +
      ((this.value - this.min) / (this.max - this.min)) * 100 +
      "%, rgb(0, 0, 0) " +
      ((this.value - this.min) / (this.max - this.min)) * 100 +
      "%, rgb(0, 0, 0) 100%)"
    this.className = "range-input2"
  }
})

// Opacity change when switching between instrumenttracks in mobile mode
// And connect respective sequencerpad with the right instrumenttrack
// TODO media query to disable opacitychange on intrumenttracks before breakpoint 1

let mediaQuery = window.matchMedia("(min-width: 420px)")

function widthChange(mediaQuery) {
  if (mediaQuery.matches) {
    for (let i = 0; i < instrumentTrack.length; i++) {
      instrumentTrack[8].style.display = "none"
      instrumentTrack[i].style.opacity = 0.4
      instrumentTrack[0].style.opacity = 1

      instrumentTrack[i].addEventListener("click", function () {
        instrumentTrack.forEach((el) => {
          event.currentTarget.style.opacity = 1
          el.style.opacity = 0.4
        })
        for (let k = 0; k < pads.length; k++) {
          if (i === k) {
            pads[k].style.zIndex = 1
          } else {
            pads[k].style.zIndex = 0
          }
          pads[k].addEventListener("click", function () {
            if (i === k) {
              instrumentTrack[i].style.opacity = 1
            } else {
              instrumentTrack[i].style.opacity = 0.4
            }
          })
        }
      })
    }
  } else {
    for (let i = 0; i < instrumentTrack.length; i++) {
      instrumentTrack[i].style.opacity = 1
    }
  }
}

widthChange(mediaQuery)
mediaQuery.addListener(widthChange)

// change textContent after breakpiont1 for instrument button hitom, lowtom and hihat
let breakpoint1 = window.matchMedia("(max-width: 420px)")

function changeInstrBtnText(breakpoint1) {
  if (breakpoint1.matches) {
    hihatBtn.textContent = "HIHAT"
    hitomBtn.textContent = "HTOM"
    lowtomBtn.textContent = "LTOM"
  } else {
    hihatBtn.textContent = "HI HAT"
    hitomBtn.textContent = "HI TOM"
    lowtomBtn.textContent = "LOW TOM"
  }
}
changeInstrBtnText(breakpoint1)
breakpoint1.addListener(changeInstrBtnText)
