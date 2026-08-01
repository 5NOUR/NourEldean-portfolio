// =============================================
//            SIDE MENU FUNCTIONALITY
// =============================================

// جلب العناصر
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll("#navbar .nav li a");

// فتح وغلق القايمة
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");

  // منع سكرول الصفحة لما القايمة مفتوحة
  document.body.style.overflow = navbar.classList.contains("active")
    ? "hidden"
    : "";
});

// غلق القايمة لما يضغط على الـ overlay
overlay.addEventListener("click", () => {
  closeMenu();
});

// غلق القايمة لما يضغط على أي لينك
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// دالة غلق القايمة
function closeMenu() {
  hamburgerMenu.classList.remove("active");
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// غلق القايمة بمفتاح ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navbar.classList.contains("active")) {
    closeMenu();
  }
});
