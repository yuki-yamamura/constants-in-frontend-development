const getOptionLabel = <T extends Record<string | number, string>>(
  options: T,
  value: T extends Record<string, string> ? string : number
): T[keyof T] | undefined => {
  return options[value as keyof T];
};

export { getOptionLabel };
