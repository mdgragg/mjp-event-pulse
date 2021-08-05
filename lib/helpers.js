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
  const parsed_until_end = Date.parse(end) - now;
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

export function calculateIfStarted(start) {
  let now = new Date();
  const parsed_event_start = Date.parse(start);
  let calc_time = parsed_event_start - now;

  if (calc_time <= 0) {
    return true;
  }
  return false;
}

export function calculateIfEnded(end) {
  let now = new Date();
  const parsed_event_end = Date.parse(end);
  let calc_time = now - parsed_event_end;

  if (calc_time >= 0) {
    return true;
  }
  return false;
}

export const token_generator = (event) => {
  return `${event.event_job.jobId}--${event.id}-${event.AuthOptions.AuthorizationType}`;
};

export const pad = (value) => {
  // value = parseInt(value, 10);
  // console.log(value);
  if (value <= 10) {
    return '0' + value;
  }
  return value;
};

export const makeDate = (date) => {
  const d = new Date(date);
  const value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  return value;
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
