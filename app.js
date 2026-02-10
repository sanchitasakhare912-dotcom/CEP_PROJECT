/* ================= TIME, DATE, GREETING ================= */

function updateTime() {
  const now = new Date();

  document.getElementById("time").innerText =
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  document.getElementById("dayDate").innerText =
    now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const h = now.getHours();
  let greet = "Good Morning";
  if (h >= 12 && h < 17) greet = "Good Afternoon";
  else if (h >= 17) greet = "Good Evening";

  document.getElementById("greeting").innerText = greet;
}

setInterval(updateTime, 1000);
updateTime();

/* ================= LANGUAGE ================= */

const translations = {
  en: { medicine: "Medicine", meal: "Meal", water: "Drink Water", rest: "Rest" },
  hi: { medicine: "दवा", meal: "भोजन", water: "पानी पिएं", rest: "आराम" },
  mr: { medicine: "औषध", meal: "जेवण", water: "पाणी प्या", rest: "विश्रांती" }
};

function setLang(lang, btn) {
  document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll("[data-key]").forEach(el => {
    el.innerText = translations[lang][el.dataset.key];
  });
}

/* ================= DONE → ✔ ================= */

function markDone(btn, taskType) {
  btn.innerText = "✔";
  btn.classList.add("done");

  const now = Date.now();

  if (taskType === "water") {
    localStorage.setItem("waterLastDone", now);
  } else {
    const taskTime = localStorage.getItem(taskType + "Time");
    localStorage.setItem(taskType + "LastDone", taskTime);
  }
}

/* ================= RESET LOGIC ================= */

function checkScheduledTask(taskType) {
  const taskTime = localStorage.getItem(taskType + "Time");
  const lastDone = localStorage.getItem(taskType + "LastDone");
  const btn = document.querySelector(`.${taskType}-btn`);

  if (!taskTime || !btn) return;

  if (taskTime !== lastDone) {
    btn.innerText = "DONE";
    btn.classList.remove("done");
  }
}

function checkWaterTask() {
  const lastDone = localStorage.getItem("waterLastDone");
  const btn = document.querySelector(".water-btn");

  if (!lastDone || !btn) return;

  if (Date.now() - lastDone >= 3600000) {
    btn.innerText = "DONE";
    btn.classList.remove("done");
  }
}

/* ================= MEDICINE DETAILS ================= */

function loadMedicineDetails() {
  const name = localStorage.getItem("medicineName");
  const time = localStorage.getItem("medicineTime");

  document.getElementById("medName").innerText =
    name && name.trim() ? name : "Medicine not set";

  document.getElementById("medTime").innerText =
    time && time.trim() ? "⏰ " + time : "⏰ --:--";
}

/* ================= SUPPORT ================= */

function confusedHelp() {
  alert("You are safe.\nFollow your routine.\nEverything is okay.");
}

function goPeople() {
  window.location.href = "people.html";
}

/* ================= AUTO CHECKS ================= */

setInterval(() => {
  checkScheduledTask("medicine");
  checkScheduledTask("meal");
  checkScheduledTask("rest");
  checkWaterTask();
}, 60000);

/* ================= ON LOAD ================= */

window.onload = function () {
  loadMedicineDetails();
  checkScheduledTask("medicine");
  checkScheduledTask("meal");
  checkScheduledTask("rest");
  checkWaterTask();
};
