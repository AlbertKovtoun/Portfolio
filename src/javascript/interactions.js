import { gsap } from "gsap"

const contactUsEmail = document.querySelector(".contact-us-email")
const tooltip = document.querySelector(".tooltip")

contactUsEmail.addEventListener("click", function () {
  let copyText = document.querySelector(".contact-us-email")

  tooltip.classList.add("fade-in-out")

  setTimeout(() => {
    tooltip.classList.remove("fade-in-out")
  }, 2000)

  navigator.clipboard.writeText(copyText.innerHTML)
})

//Make cursor follow mouse
const dot = document.querySelector(".dot")
let cursor = { x: 0, y: 0 }

window.addEventListener("mousemove", (ev) => {
  cursor.x = ev.clientX
  cursor.y = ev.clientY

  gsap.to(dot, { x: cursor.x, y: cursor.y, duration: 0.5 })
})
