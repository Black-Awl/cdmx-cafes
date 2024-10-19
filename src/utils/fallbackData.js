import cafes from '../data/cafes.json';

export function getFallbackCafes() {
  console.warn('Using fallback cafe data');
  return cafes;
}

