window.addEventListener("load", () => {
  const points = document.getElementById("points");
  const gameBox = document.getElementById("mystery-game");
  const rewards = document.getElementById("rewards");
  if (!points || !gameBox) return;
  gameBox.addEventListener("click", async (e) => {
    const _points = +points.innerText;
    if (!_points) {
      const dialog = document.getElementById("dialog");
      dialog.classList.add("open");
      return;
    }

    // if (![...e.target.classList].includes("mystery-box")) return;
    if (!e.target.classList.contains("mystery-box")) return;
    e.target.style.zIndex = 0;
    points.innerText = String(_points - 1);
    await callback(e.target, rewards);
  });
});

async function callback(theBox, rewards) {
  rewards.innerText = Number(
    +rewards.innerText.replaceAll(",", "") + Math.round(Math.random() * 500000),
  ).toLocaleString();
}
