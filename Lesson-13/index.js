class Button {
  constructor(className, styles) {
    this.className = className;
    this.styles = styles;
  }

  createButton() {
    const button = document.createElement("button");

    Object.entries(this.styles).forEach(([key, value]) => {
      button.style[key] = value;
    });

    button.classList.add(this.className);

    return button;
  }
}

class Slider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.slides = this.container.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.initSlider();
    this.width = window.innerWidth;

    this.prevButton = new Button("prev-button", {
      position: "fixed",
      top: "50%",
      left: "0",
    });

    this.nextButton = new Button("prev-button", {
      position: "fixed",
      top: "50%",
      right: "0",
    });

    this.createControls();
  }

  initSlider() {
    const styles = {
      transform: `translateX(${this.currentSlide})`,
      transition: ".5s",
      display: "flex",
      position: "relative",
    };

    Object.entries(styles).forEach(([key, value]) => {
      this.container.style[key] = value;
    });
  }

  createControls() {
    const prevButton = this.prevButton.createButton();
    const nextButton = this.nextButton.createButton();
    prevButton.textContent = "Prev";
    nextButton.textContent = "next";

    prevButton.addEventListener('click', () => this.prev());
    nextButton.addEventListener('click', () => this.next());

    this.container.parentElement.append(prevButton, nextButton);
  }

  next() {
    console.log(this.currentSlide);
    if(this.currentSlide < this.slides.length - 1) {
      this.currentSlide = this.currentSlide + 1;
      this.container.style.transform = `translateX(-${this.currentSlide * this.width + 'px'})`
    }
  }

  prev() {
    // console.log(this.currentSlide);
    if(this.currentSlide !== 0) {
      console.log(this.width / this.currentSlide);
      this.currentSlide = this.currentSlide - 1;
      this.container.style.transform = `translateX(-${this.width * this.currentSlide + 'px'})`
    }
  }
}

const slider = new Slider(".slider");
