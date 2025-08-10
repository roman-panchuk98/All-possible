export function showLoader(loader) {
  loader.parentElement.classList.remove('loader-hidden');
}
export function hideLoader(loader) {
  loader.parentElement.classList.add('loader-hidden');
}
