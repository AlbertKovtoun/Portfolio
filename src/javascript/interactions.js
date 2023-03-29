import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SmoothScroll from "smooth-scroll"

gsap.registerPlugin(ScrollTrigger)

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

const landing = document.querySelector(".landing")
const landingLogo = document.querySelector(".landing-logo")

gsap.from(landingLogo, {
  scrollTrigger: {
    trigger: landing,
    // scrub: true,
  },

  opacity: 0,
  duration: 2,
})

window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}

//Smooth scroll to anchor
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  easing: "easeInOutQuart",
})
