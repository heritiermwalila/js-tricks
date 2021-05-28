/**
 * @author Heritier
 */
 class Carousel {
  /**
   *
   * @param {HTMLElement} element
   * @param {object} opts
   * @param {object} opts.slideToScroll integer
   * @param {object} opts.sliderToShow integer
   */
  constructor(element, opts = {}) {
    this.options = Object.assign(
      {},
      {
        slideToScroll: 1,
        sliderToShow: 1,
        nextBtn: {
          text: "Next"
        },
        prevBtn: {
          text: "Prev"
        }
      },
      opts
    );

    this.currentSlider = 0;

    //HTML SELECTOR
    this.element = element;

    //The html selector children
    const children = [].slice.call(element.children);

    //calculate the ratio

    //Create the root element
    this.rootEl = this.createHtmlElement("carousel");

    //Add container to the instance
    this.containerEl = this.createHtmlElement("carousel__container");

    //Append the container to the root of carousel
    this.rootEl.appendChild(this.containerEl);

    //add the root element to the selector element
    this.element.appendChild(this.rootEl);

    //add items to the intances
    this.items = children.map((child) => {
      const carouselItem = this.createHtmlElement("carousel__item");

      carouselItem.appendChild(child);
      this.containerEl.appendChild(carouselItem);
      return carouselItem;
    });

    this.setStyle();
    this.createNavigation();
  }

  createHtmlElement(className) {
    const element = document.createElement("div");
    element.setAttribute("class", className);
    return element;
  }

  /**
   * Set carousel items styles
   */
  setStyle() {
    let ratio = this.items.length / this.options.sliderToShow;
    //Difine the width of the carousel container
    this.containerEl.style.width = ratio * 100 + "%";
    this.items.forEach((item) => {
      item.style.width = 100 / this.options.sliderToShow / ratio + "%";
    });
  }

  /**
   *
   */
  createNavigation() {
    const nextBtn = this.createHtmlElement("carousel__next");
    const prevBtn = this.createHtmlElement("carousel__prev");
    nextBtn.textContent = this.options.nextBtn.text ?? "Next";
    prevBtn.textContent = this.options.prevBtn.text ?? "Prev";
    this.rootEl.appendChild(nextBtn);
    this.rootEl.appendChild(prevBtn);
    nextBtn.addEventListener("click", this.nextBtnHandler.bind(this));
    prevBtn.addEventListener("click", this.prevBtnHandler.bind(this));
  }

  nextBtnHandler() {
    this.goItem(this.currentSlider + this.options.slideToScroll);
  }

  prevBtnHandler() {
    this.goItem(this.currentSlider - this.options.slideToScroll);
  }

  goItem(index) {
    if(index < 0){
      index = this.items - this.options.sliderToShow
    }else if(index >= this.items.length || !this.items[this.currentSlider + this.options.sliderToShow]){
      index = 0
    }
    const translateX = (index * -100) / this.items.length;
    console.log(index);

    this.containerEl.style.transform = "translate3d(" + translateX + "%, 0, 0)";
    this.currentSlider = index;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Carousel(document.querySelector("#carousel_1"), {
    sliderToShow: 3,
    slideToScroll: 3
  });

  new Carousel(document.querySelector("#carousel_2"));
});
