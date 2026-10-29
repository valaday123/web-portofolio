
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mengganti tema terang dan gelap
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "☀" : "☾";

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Menyimpan pilihan tema
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☀";
}

// Menu responsif untuk HP
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.textContent = navLinks.classList.contains("active")
    ? "✕"
    : "☰";
});

// Menutup menu setelah memilih halaman
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// Animasi saat scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const style = document.createElement("style");
style.textContent = `
  .section {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity .7s, transform .7s;
  }
  .section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .section {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;
document.head.appendChild(style);

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});