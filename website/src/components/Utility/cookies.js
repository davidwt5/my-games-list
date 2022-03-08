// Contains helper functions that help parse cookies

// https://stackoverflow.com/questions/5047346/converting-strings-like-document-cookie-to-objects
function getCookiesInObjFormat() {
  if (document.cookie.length === 0) return undefined;
  else
    return document.cookie.split("; ").reduce((prev, current) => {
      const [name, ...value] = current.split("=");
      prev[name] = value.join("=");
      return prev;
    }, {});
}

export default getCookiesInObjFormat;
