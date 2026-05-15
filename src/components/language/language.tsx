export const getLanguageName = (code: string): string => {
  try {
    const displayNames = new Intl.DisplayNames(['en'], {
      type: 'language'
    });
    return displayNames.of(code) || code;
  } catch {
    return code;
  }
};