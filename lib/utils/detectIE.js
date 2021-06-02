export default function ieVersion(ua) {
  if (ua.indexOf('Trident/7.0') > -1) return { isIE: true, version: 11 };
  else if (ua.indexOf('Trident/6.0') > -1) return { isIE: true, version: 10 };
  else if (ua.indexOf('Trident/5.0') > -1) return { isIE: true, version: 9 };
  else return { isIE: false, version: null }; // not IE9, 10 or 11
}
