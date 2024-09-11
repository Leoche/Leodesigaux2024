export function useDate(dateStr, locale) {
    let lang = "en-US";
    if(locale.includes("fr")){
        lang = "fr-FR";
    }
    let dateObj = new Date(dateStr);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(lang, options);
  }