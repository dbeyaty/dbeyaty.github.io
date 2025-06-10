function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}

const correctHash = "91447360102d996499a79769219709f571ef98d1dd1aa073a2b83c915c87172b"; // hash of "sajt"

async function hashPassword(pw) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function showSite() {
  document.body.classList.remove("auth");
  document.getElementById("loginOverlay").classList.add('d-none');
}

async function checkLogin() {
  const storedHash = localStorage.getItem("weddingPasswordHash");
  if (storedHash === correctHash) {
    showSite();
  }
}

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const enteredPw = document.getElementById("passwordInput").value;
  const hashed = await hashPassword(enteredPw);

  console.log(enteredPw, ' ', hashed)
  if (hashed === correctHash) {
    localStorage.setItem("weddingPasswordHash", hashed);
    showSite();
  } else {
    document.getElementById("errorMsg").classList.remove('d-none');
  }
});

checkLogin();
