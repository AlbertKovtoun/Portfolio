export class LoadingScreen {
  constructor() {
    this.setLoadingScreen()
  }

  setLoadingScreen() {
    this.loadingScreen = document.querySelector(".loading-screen")
    console.log(this.loadingScreen)
  }

  dissapear() {
    this.loadingScreen.classList.add("fade-out")
    // this.loadingScreen.addEventListener("transitionend", onTransitionEnd)
  }
}
