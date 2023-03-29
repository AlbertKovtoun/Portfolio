export class LoadingScreen {
  constructor() {
    this.setLoadingScreen()
  }

  setLoadingScreen() {
    this.body = document.querySelector("body")
    this.loadingScreen = document.querySelector(".loading-screen")
    this.loadingScreenContainer = document.querySelector(
      ".loading-screen-container"
    )
    this.loadingScreenText = document.querySelector(".loading-screen-text")
    this.loadingScreenIconContrainer = document.querySelector(
      ".loading-screen-icon-container"
    )
    this.loadingScreenBottomText = document.querySelector(
      ".loading-screen-bottom-text"
    )
    this.introTextContainer0 = document.querySelector(".intro-text-container-0")
    this.introTextContainer1 = document.querySelector(".intro-text-container-1")

    //Prevent user from scrolling
    this.body.style.position = "fixed"
    // this.body.style.top = `-${window.scrollY}px`
  }

  playLoadingScreenAnimations() {
    // this.loadingScreen.classList.add("fade-out")
    this.loadingScreenText.classList.add("fade-out")
    this.loadingScreenIconContrainer.classList.add("fade-out")
    this.loadingScreenBottomText.classList.add("fade-out")

    setTimeout(() => {
      this.introTextContainer0.classList.add("fade-in")
    }, 1000)

    setTimeout(() => {
      this.introTextContainer0.classList.remove("fade-in")
      this.introTextContainer0.classList.add("fade-out")
    }, 3000)

    setTimeout(() => {
      this.introTextContainer1.classList.add("fade-in")
    }, 4000)

    setTimeout(() => {
      this.introTextContainer1.classList.remove("fade-in")
      this.introTextContainer1.classList.add("fade-out")
    }, 7000)

    setTimeout(() => {
      this.loadingScreenContainer.classList.add("move-up")
    }, 8000)

    setTimeout(() => {
      this.loadingScreen.classList.add("fade-out")

      //Let user scroll again
      this.body.style.position = "relative"
    }, 9000)

    setTimeout(() => {
      this.loadingScreen.style.display = "none"
    }, 10000)
  }
}
