function urlGenerator({ domain = "", endpoint = "", queryStrings = {} }) {
  if (!domain) return "";
  let url = new URL(endpoint, domain);
  for (let key of Object.keys(queryStrings)) {
    url.searchParams.append(key, queryStrings[key]);
  }
  return url;
}

module.exports = urlGenerator;
