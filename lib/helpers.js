export function get_ext(file) {
  file = file.split(/[#?]/)[0].split('.').pop().trim();
  return file;
}
