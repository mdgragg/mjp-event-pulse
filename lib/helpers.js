export function get_ext(file) {
  file = file.split(/[#?]/)[0].split('.').pop().trim();
  return file;
}

export function getKeyValue(keyValue) {
  let obj = {};

  keyValue.map((kv) => {
    obj[kv['key']] = kv['value'];
  });

  return obj;
}

export function calcHasStarted(eventStartEnd) {
  const now = new Date();
  const hasStarted =
    Date.parse(eventStartEnd.StartDateTime) < Date.parse(now) &&
    Date.parse(eventStartEnd.EndDateTime) > Date.parse(now);

  return hasStarted;
}
