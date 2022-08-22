import { HEADER_PROPERTY_KEY, STATUS_VALUES } from './useMyRfpInitData';

export default function useMyRfpComparators() {
  const stringComparator = (a: string, b: string) => {
    if (a && b) {
      const la = a.toLowerCase();
      const lb = b.toLowerCase();
      if (lb < la) {
        return -1;
      }
      if (lb > la) {
        return 1;
      }
    }
    return 0;
  };

  const statusComparator = (a, b) => {
    const la = STATUS_VALUES.indexOf(a);
    const lb = STATUS_VALUES.indexOf(b);
    if (lb < la) {
      return -1;
    }
    if (lb > la) {
      return 1;
    }
    return 0;
  };

  const dateComparator = (a: any, b: any) => {
    const result = new Date(b) - new Date(a) > 0 ? 1 : -1;
    return result;
  };

  const descendingComparator = (a: any, b: any, orderBy: any) => {
    const key = HEADER_PROPERTY_KEY[orderBy];
    if (orderBy === '2' || orderBy === '3' || orderBy === '4') {
      return dateComparator(a[key], b[key], orderBy);
    }
    if (orderBy === '1' || orderBy === '5' || orderBy === '6') {
      return stringComparator(a[key], b[key], orderBy);
    }
    return 0;
  };

  const getComparator = (orderBy: any, direction: string) => {
    const value = direction === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    return value;
  };

  return {
    getComparator,
  };
}
