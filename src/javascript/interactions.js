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
