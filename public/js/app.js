window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const referCodeDialog = document.getElementById("copyReferalCodeDialog");
  const successCopyText = document.getElementById("successCopyText");
  if (referCodeDialog && referCodeDialog) {
    referCodeDialog.addEventListener("click", () => {
      navigator.clipboard
        .writeText(referCodeDialog.getAttribute("data-code"))
        .then(() => {
          successCopyText.classList.remove("hidden");
          setTimeout(() => successCopyText.classList.add("hidden"), 3000);
        });
    });
  }

  const dialog = document.getElementById("dialog");
  const closeDialog = document.getElementById("close-dialog");
  closeDialog &&
    closeDialog.addEventListener("click", () => {
      dialog.classList.remove("open");
    });

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

  new Swiper(".video-slider", {
    spaceBetween: 25,
    slidesPerGroup: 6,
    slidesPerView: 6,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 15,
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
      640: {
        spaceBetween: 15,
        slidesPerGroup: 3,
        slidesPerView: 3,
      },
      940: {
        spaceBetween: 15,
        slidesPerGroup: 4,
        slidesPerView: 4,
      },
      1024: {
        spaceBetween: 25,
        slidesPerGroup: 5,
        slidesPerView: 5,
      },
      1224: {
        spaceBetween: 25,
        slidesPerGroup: 6,
        slidesPerView: 6,
      },
    },
  });

  new Swiper(".audio-slider", {
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
    createVideoForm.addEventListener("change", () => {
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
    copyReferalCode.addEventListener("click", () => {
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
      const fullDurationPlaceholder = audio.querySelector(".full-duration");
      const currentTimePlaceholder = audio.querySelector(".current-time");
      const progress = audio.querySelector(".progress");
      const pauseIcon = audio.querySelector(".pauseIcon");
      const playIcon = audio.querySelector(".playIcon");
      const durationPlaceholder = audio.querySelector(".track-duration");
      source.addEventListener("timeupdate", (e) => {
        const { duration, currentTime } = e.target;

        function addZero(input) {
          return input > 9 ? input : `0${input}`;
        }

        const sec = Math.floor(currentTime % 60);
        const min = Math.floor(currentTime / 60);
        if (durationPlaceholder)
          durationPlaceholder.innerText = `${addZero(min)}:${addZero(sec)}`;
        if (progress) {
          progress.style.width = `${(currentTime / duration) * 100}%`;
        }
        if (currentTimePlaceholder) {
          currentTimePlaceholder.innerText = `${addZero(min)}:${addZero(sec)}`;
        }
        if (fullDurationPlaceholder) {
          fullDurationPlaceholder.innerText = `${addZero(Math.floor(duration / 60))}:${addZero(Math.floor(duration % 60))}`;
        }
      });
      source.addEventListener("pause", () => {
        playIcon.classList.remove("!hidden");
        pauseIcon.classList.add("!hidden");
        if (durationPlaceholder) durationPlaceholder.innerText = "";
      });
      source.addEventListener("play", () => {
        playIcon.classList.add("!hidden");
        pauseIcon.classList.remove("!hidden");
      });

      playButton.addEventListener("click", () => {
        document.querySelectorAll("audio")?.forEach((s) => {
          s !== source && !s.paused && s.pause();
        });
        try {
          source.paused ? source.play() : source.pause();
        } catch (e) {
          console.log(e);
        }
      });
    });
  }
  gsapAnimation();

  const loading = document.getElementById("loading");
  document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
  loading.classList.remove("bg-black");
  loading.querySelector(".loading-text").style.opacity = "0";
});

function gsapAnimation() {
  if (!document.getElementById("loading")) return;
  const duration = 2;
  const ease = "";
  const matchMedia = gsap.matchMedia();
  matchMedia.add(
    { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" },
    (context) => {
      const { mobile, desktop } = context.conditions;
      const tl = gsap
        .timeline({
          scrollTrigger: {
            pin: true,
            trigger: ".hero-section",
            scrub: 1,
            pinSpacing: true,
            end: "+=2000",
          },
        })
        .fromTo(
          "#header",
          { opacity: 0, backgroundColor: "rgba(0,0,0,0.2)" },
          { opacity: 1, duration: 1, backgroundColor: "rgba(255,255,255,0.5)" },
          1,
        )
        .to(".ct-welcome", { opacity: 0, duration: 0.8 }, 0)

        .fromTo(
          ".moon",
          { yPercent: mobile ? -600 : 100 },
          {
            yPercent: 0,
            duration,
            ease,
          },
          0,
        )
        .fromTo(
          ".stars",
          { yPercent: -100 },
          { yPercent: 0, duration, ease },
          0,
        )
        .fromTo(
          ".cloud",
          { xPercent: -100 },
          {
            xPercent: 0,
            duration,
            ease,
          },
          0,
        )
        .fromTo(
          ".foreground",
          { scale: 1.5 },
          {
            scale: 1,
            duration,
            transformOrigin: "bottom center",
            ease,
          },
          0,
        )
        .fromTo(
          ".background",
          { yPercent: -40, scale: 2 },
          {
            yPercent: 0,
            duration,
            scale: 1,
            transformOrigin: "center center",
            ease,
          },
          0,
        )
        .fromTo(
          ".cloud-up-to-bottom",
          { xPercent: -100, yPercent: -100 },
          {
            duration,
            xPercent: 0,
            yPercent: 0,
            ease,
          },
          0,
        )
        .fromTo(
          ".cloud-3",
          { xPercent: -100 },
          {
            xPercent: 0,
            duration,
            ease,
          },
          0,
        )
        .fromTo(
          ".cloud-reverse",
          { xPercent: 100, yPercent: -100 },
          {
            xPercent: 0,
            yPercent: 0,
            duration,
            ease,
            transformOrigin: "center center",
          },
          0,
        )
        .fromTo(
          ".cloud-right-to-bottom",
          { xPercent: 30, yPercent: 30 },
          {
            xPercent: 0,
            yPercent: 0,
            duration,
            ease,
            transformOrigin: "center center",
          },
          0,
        )
        .fromTo(
          ".dialog",
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: 0.2 },
        );

      if (mobile)
        tl.fromTo(
          ".father-and-child",
          {
            scale: 60,
            transformOrigin: "28% 35%",
          },
          {
            ease: "power1.out",
            scale: 1,
            duration,
            transformOrigin: "28% 35%",
          },
          0,
        );
      else if (desktop) {
        tl.fromTo(
          ".father-and-child",
          {
            scale: 42,
            transformOrigin: "28% 25%",
          },
          {
            ease,
            scale: 1,
            duration,
            transformOrigin: "28% 25%",
          },
          0,
        );
      }
    },
  );
}
