// Loading Animation Script
window.onload = e => {
  document.querySelector('.loading').style.opacity = '0';
  setTimeout(e => document.querySelector('.loading').remove(), 400);
}
