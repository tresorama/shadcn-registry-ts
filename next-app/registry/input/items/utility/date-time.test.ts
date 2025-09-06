import { describe, it, expect } from 'vitest';

import { formatMillisecondsToHumanReadable, createTimeRanges } from './date-time';

describe('date-time - formatMillisecondsToHumanReadable', () => {

  it('do it', () => {
    // under 1s it should be in ms
    expect(formatMillisecondsToHumanReadable(0)).toBe('0ms');
    expect(formatMillisecondsToHumanReadable(100)).toBe('100ms');
    expect(formatMillisecondsToHumanReadable(200)).toBe('200ms');
    expect(formatMillisecondsToHumanReadable(300)).toBe('300ms');
    expect(formatMillisecondsToHumanReadable(400)).toBe('400ms');
    expect(formatMillisecondsToHumanReadable(500)).toBe('500ms');
    expect(formatMillisecondsToHumanReadable(600)).toBe('600ms');
    expect(formatMillisecondsToHumanReadable(700)).toBe('700ms');
    expect(formatMillisecondsToHumanReadable(800)).toBe('800ms');
    expect(formatMillisecondsToHumanReadable(900)).toBe('900ms');
    // from 1 to 59s should be in seconds
    expect(formatMillisecondsToHumanReadable(1_000)).toBe('1s');
    expect(formatMillisecondsToHumanReadable(1_100)).toBe('1.1s');
    expect(formatMillisecondsToHumanReadable(1_500)).toBe('1.5s');
    expect(formatMillisecondsToHumanReadable(2_000)).toBe('2s');
    expect(formatMillisecondsToHumanReadable(10_000)).toBe('10s');
    expect(formatMillisecondsToHumanReadable(20_000)).toBe('20s');
    expect(formatMillisecondsToHumanReadable(30_000)).toBe('30s');
    expect(formatMillisecondsToHumanReadable(40_000)).toBe('40s');
    expect(formatMillisecondsToHumanReadable(50_000)).toBe('50s');
    expect(formatMillisecondsToHumanReadable(59_000)).toBe('59s');

    // from 1m to 1h should be in minutes (and seconds if not zero)
    expect(formatMillisecondsToHumanReadable(60_000)).toBe('1m');
    expect(formatMillisecondsToHumanReadable(65_000)).toBe('1m 5s');
    expect(formatMillisecondsToHumanReadable(90_000)).toBe('1m 30s');
    expect(formatMillisecondsToHumanReadable(120_000)).toBe('2m');
    expect(formatMillisecondsToHumanReadable(600_000)).toBe('10m');
    expect(formatMillisecondsToHumanReadable(1_800_000)).toBe('30m');
    expect(formatMillisecondsToHumanReadable(3_600_000 - 1_000)).toBe('59m 59s');
    // from 1h to 24h should be in hours
    expect(formatMillisecondsToHumanReadable(3_600_000)).toBe('1h');

  });

  it("strange input", () => {
    expect(formatMillisecondsToHumanReadable(-50)).toBe('-50ms');
  });

});

describe('date-time - createTimeRanges', () => {

  it('do it', () => {
    const ranges = createTimeRanges({
      firstDay: new Date(2022, 0, 1),
      rangeSizeInMonths: 1,
      formatName: ({ from, to, rangeSizeInMonths, format }) => rangeSizeInMonths === 1
        ? format(from, "MMM")
        : `${format(from, "MMM")} ${format(to, "MMM")}`
    });
    expect(ranges.length).toBe(12);
    expect(ranges).toMatchObject([
      { name: 'Jan' },
      { name: 'Feb' },
      { name: 'Mar' },
      { name: 'Apr' },
      { name: 'May' },
      { name: 'Jun' },
      { name: 'Jul' },
      { name: 'Aug' },
      { name: 'Sep' },
      { name: 'Oct' },
      { name: 'Nov' },
      { name: 'Dec' },
    ]);
    expect(ranges[0].matchRange(new Date(2022, 0, 1))).toBe(true);
    expect(ranges[0].matchRange(new Date(2022, 1, 1))).toBe(false);

  });

  it('do it', () => {
    const ranges = createTimeRanges({
      firstDay: new Date(2022, 0, 1),
      rangeSizeInMonths: 4,
      formatName: ({ from, to, rangeSizeInMonths, format }) => rangeSizeInMonths === 1
        ? format(from, "MMM")
        : `${format(from, "MMM")} ${format(to, "MMM")}`
    });
    expect(ranges.length).toBe(3);
    expect(ranges).toMatchObject([
      { name: 'Jan Apr' },
      { name: 'May Aug' },
      { name: 'Sep Dec' },
    ]);

    expect(ranges[0].matchRange(new Date(2022, 0, 1))).toBe(true);
    expect(ranges[0].matchRange(new Date(2022, 10, 1))).toBe(false);
  });

  it('do it', () => {
    const data = [
      {
        price: 90,
        date: new Date(2022, 2, 10), // 10 march
      },
      {
        price: 100,
        date: new Date(2022, 3, 20), // 20 april
      }
    ];
    const ranges = createTimeRanges({
      firstDay: new Date(2022, 0, 1),
      rangeSizeInMonths: 1,
      formatName: ({ from, format }) => format(from, "MMM"),
    });

    const groupedByMonths = ranges.map(range => {
      const itemsOfThisRange = data.filter(item => range.matchRange(item.date));
      return {
        rangeName: range.name,
        items: itemsOfThisRange,
      };
    });

    groupedByMonths.forEach(group => {
      if (group.rangeName === 'Mar') {
        expect(group.items.length).toBe(1);
        expect(group.items[0].price).toBe(90);
        return;
      }
      if (group.rangeName === 'Apr') {
        expect(group.items.length).toBe(1);
        expect(group.items[0].price).toBe(100);
        return;
      }
    });
  });

});