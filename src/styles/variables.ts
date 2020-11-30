const breakpoints = [576, 768, 992, 1200];

export default {
  lightPurple: '#eaebff',
  blue: '#7491e9',
  gray: '#989898',
  lightGray: '#ced0d4',
  borderColor: '#707070',
  background: '#f0f2f5',
  error: '#ff3939',
  logoColor: '#5258cb',
  pink: '#ffceee',
  magenta: '#d9367f',
  gradient: (direction: string) => `linear-gradient(${direction}, #4e54c8 0%, #8f94fb 100%)`,
  mq: breakpoints.map((bp) => `@media (max-width: ${bp}px)`),
};
