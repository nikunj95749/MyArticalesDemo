const templates = {
  prefix: '',
  suffix: ' ago',
  seconds: '< than a minute',
  minute: 'about a minute',
  minutes: '%d minutes',
  hour: 'about an hour',
  hours: 'about %d hours',
  day: 'a day',
  days: '%d days',
  month: 'about a month',
  months: '%d months',
  year: 'about a year',
  years: '%d years',
};

export const timeAgo = time => {
  const template = function (t, n) {
    return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
  };

  function timer() {
    if (!time) {
      return;
    }

    time = time.replace(/\.\d+/, ''); // remove milliseconds
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    // eslint-disable-next-line no-useless-escape
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    const now = new Date();
    // eslint-disable-next-line no-bitwise
    const seconds = ((now.getTime() - time) * 0.001) >> 0;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    return (
      templates.prefix +
      ((seconds < 45 && template('seconds', seconds)) ||
        (seconds < 90 && template('minute', 1)) ||
        (minutes < 45 && template('minutes', minutes)) ||
        (minutes < 90 && template('hour', 1)) ||
        (hours < 24 && template('hours', hours)) ||
        (hours < 42 && template('day', 1)) ||
        (days < 30 && template('days', days)) ||
        (days < 45 && template('month', 1)) ||
        (days < 365 && template('months', days / 30)) ||
        (years < 1.5 && template('year', 1)) ||
        template('years', years)) +
      templates.suffix
    );
  }

  return timer() || '';
};

export const sortByDate = array => {
  return array.sort(function (a, b) {
    var c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    return d - c;
  });
};
