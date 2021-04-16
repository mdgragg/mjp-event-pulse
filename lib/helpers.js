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

export const calculate_remaining = (start, end) => {
  const now = Date.now();
  const parsed_remaining = Date.parse(start) - now;
  const parsed_until_end = now - Date.parse(end);
  // if (parsed_until_end > 0) return null;

  const obj = {
    parsed_until_end,
    total_remaining: parsed_remaining,
    days: Math.floor(parsed_remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((parsed_remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((parsed_remaining / 1000 / 60) % 60),
    seconds: Math.floor((parsed_remaining / 1000) % 60),
  };

  if (obj.seconds < 10) obj.seconds = '0' + obj.seconds;

  //make it null if its zero
  Object.keys(obj).map((key) => {
    if (
      obj[key] <= 0 &&
      key !== 'seconds' &&
      key !== 'total_remaining' &&
      key !== 'parsed_until_end'
    ) {
      obj[key] = '00';
    }
  });

  return obj;
};
