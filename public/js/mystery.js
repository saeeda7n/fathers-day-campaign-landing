window.addEventListener("load", () => {
  const points = document.getElementById("points");
  const gameBox = document.getElementById("mystery-game");
  if (!points || !gameBox) return;
  gameBox.addEventListener("click", async (e) => {
    const _points = +points.innerText;
    if (!_points)
      return alert("شما امتیاز کافی برای باز کردن جعبه های شانس ندارید!");

    // if (![...e.target.classList].includes("mystery-box")) return;
    if (!e.target.classList.contains("mystery-box")) return;
    e.target.style.zIndex = 0;
    points.innerText = String(_points - 1);
    await callback(e.target);
  });
});

async function callback(theBox) {}
