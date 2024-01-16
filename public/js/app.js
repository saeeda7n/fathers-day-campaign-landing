window.addEventListener("load", () => {
  let swiper = new Swiper(".post-card-slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
  });
  const filters = document.querySelector("[data-filters]");
  filters?.addEventListener("click", (e) => {
    filters.querySelectorAll("[data-filter]").forEach((filter) => {
      filter.classList.remove("active");
    });

    if (!e.target || !e.target?.getAttribute("data-filter")) return;
    e.target.classList.add("active");
    const filter = e.target?.getAttribute("data-filter");
    swiper.destroy();

    filters.querySelectorAll("[data-filter-value]").forEach((target) => {
      if (filter === "all") {
        target.classList.remove("non-swiper-slide");
        target.classList.remove("hidden-card");
        return;
      }
      if (filter === target.getAttribute("data-filter-value")) {
        target.classList.remove("non-swiper-slide");
        target.classList.remove("hidden-card");
      } else {
        target.classList.add("non-swiper-slide");
        target.classList.add("hidden-card");
      }
    });
    swiper = new Swiper(".post-card-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
    });
  });

  let videoSwiper = new Swiper(".video-slider", {
    spaceBetween: 25,
    slidesPerGroup: 6,
    slidesPerView: 6,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    0: {
      spaceBetween: 15,
      slidesPerGroup: 1,
      slidesPerView: 1,
    },
    640: {
      spaceBetween: 15,
      slidesPerGroup: 2,
      slidesPerView: 2,
    },
    940: {
      spaceBetween: 15,
      slidesPerGroup: 3,
      slidesPerView: 3,
    },
    1124: {
      spaceBetween: 25,
      slidesPerGroup: 6,
      slidesPerView: 6,
    },
  });

  let audioSwiper = new Swiper(".audio-slider", {
    spaceBetween: 25,
    slidesPerGroup: 4,
    slidesPerView: 4,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 15,
        slidesPerGroup: 1,
        slidesPerView: 1,
      },
      640: {
        spaceBetween: 15,
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
      940: {
        spaceBetween: 15,
        slidesPerGroup: 3,
        slidesPerView: 3,
      },
      1124: {
        spaceBetween: 25,
        slidesPerGroup: 4,
        slidesPerView: 4,
      },
    },
  });

  function createVideoFormValidator() {
    const createVideoForm = document.getElementById("createVideoForm");
    const createVideoButton = document.getElementById("createVideoButton");

    if (!createVideoForm) return;
    createVideoForm.addEventListener("change", (e) => {
      const { video, audio } = createVideoForm;
      if ([video.value, audio.value].includes("")) {
        createVideoButton.disabled = true;
      } else {
        createVideoButton.disabled = false;
      }
    });
  }

  createVideoFormValidator();

  const copyReferalCode = document.getElementById("copyReferalCode");
  if (copyReferalCode) {
    copyReferalCode.addEventListener("click", (e) => {
      const code = copyReferalCode.getAttribute("data-code");
      navigator.clipboard.writeText(code);
      alert("کد زیر مجموعه گیری با موفقیت کپی شد");
    });
  }

  const inputs = document.querySelector("[data-opt='input']");
  const output = document.querySelector("[data-opt='output']");
  if (inputs) {
    inputs.addEventListener("input", (e) => {
      const dummyInputs = [...inputs.querySelectorAll("input")].filter(
        (input) => !!input.getAttribute("data-index"),
      );
      const opt = dummyInputs.map((input) => input.value).join("");
      output.value = opt;
      const { target } = e;
      const { value } = target;
      if (isNaN(value)) {
        target.value = "";
        return;
      }
      if (value.length) {
        target.nextElementSibling.focus();
      }
    });
    inputs.addEventListener("keyup", (e) => {
      const { target, key } = e;
      const { value } = target;
      if (["delete", "backspace"].includes(key.toLowerCase())) {
        target.previousElementSibling.focus();
        target.previousElementSibling.select();
      }
    });
  }
  const audios = document.querySelectorAll(".audio-source");
  if (audios) {
    audios.forEach((audio) => {
      const source = audio.querySelector("audio");
      const playButton = audio.querySelector(".play-toggle");
      const pauseIcon = audio.querySelector(".pauseIcon");
      const playIcon = audio.querySelector(".playIcon");
      source.addEventListener("pause", () => {
        playIcon.classList.remove("!hidden");
        pauseIcon.classList.add("!hidden");
      });
      source.addEventListener("play", () => {
        playIcon.classList.add("!hidden");
        pauseIcon.classList.remove("!hidden");
      });

      playButton.addEventListener("click", () => {
        document.querySelectorAll("audio")?.forEach((s) => {
          s !== source && !s.paused && s.pause();
        });
        source?.paused ? source?.play() : source?.pause();
      });
    });
  }
});
