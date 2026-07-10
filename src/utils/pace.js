export function calcPace(durationMin, distanceKm) {
    if (!distanceKm || distanceKm <= 0) {
        return "N/A";
    }

    const paceDecimal = durationMin / distanceKm;
    let minutes = Math.floor(paceDecimal); /* the whole-number part of paceDecimal*/
    const secondsDecimal = paceDecimal - minutes;
    let seconds = Math.round(secondsDecimal * 60); /* secondsDecimal * 60, rounded to a whole number */

  // Edge case: if seconds rounds up to 60 (e.g. 5:59.6 rounds to 5:60),
  // you need to bump minutes up by 1 and reset seconds to 0.
  // Think about when this could happen with Math.round().
    if (seconds === 60) {
            minutes++;
            seconds = 0;
        }

    const paddedSeconds = seconds.toString().padStart(2, '0'); /* seconds as a 2-digit string, e.g. "05" not "5" */
    return `${minutes}:${paddedSeconds} min/km`;
}