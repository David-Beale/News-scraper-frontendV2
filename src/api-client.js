const BASE_URL = 'https://db-news-scraper-backend.herokuapp.com'

export default {
  getHeadlines: (day, month, year) => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
    }
    return fetchRequest(`graphql?query={ headline(year: ${year} month:${month} day:${day} )
      {day 
      month 
      year 
      newspaper 
      id
      headline
      summary
      image
      link 
      scraperID}
    }`, options);
  },
  getWebsite: (website) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    }
    return fetchRequest(`graphql?query={  html(name:"${website}"){
      htmlBody
    }
  }`, options);
  },
  forceRefresh: () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    }
    return fetchRequest(`graphql?query={  refresh( name:"refresh")
  }`, options);
  },
  saveNewFeed: (webLink, webName, titlePath, root, summaryPath, linkPath, imagePath, imageTag) => {
    console.log('saving new feed')
    titlePath = JSON.stringify(titlePath)
    summaryPath = JSON.stringify(summaryPath)
    linkPath = JSON.stringify(linkPath)
    imagePath = JSON.stringify(imagePath)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(
        { query: `mutation add { addFeed(website: "${webLink}" name: "${webName}" titlePath: ${titlePath} titleRoot: "${root}" summaryPath: ${summaryPath} linkPath: ${linkPath} imagePath: ${imagePath} imageTag:"${imageTag}") { website } }` })
    }
    console.log(options.body)
    return fetchRequest(`graphql?`, options);
  },
  deleteHeadline: (id) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(
        { query: `mutation deleteHeadline { deleteHeadline(id: "${id}") }` })
    }
    return fetchRequest(`graphql?`, options);
  },
  deleteScraper: (id) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(
        { query: `mutation deleteScraper { deleteScraper(id: "${id}") }` })
    }
    return fetchRequest(`graphql?`, options);
  },
  authenticate: () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
    }
    return fetchRequest(`users`, options);
  },
  login: (post) => {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(post)
    }
    return fetchRequest(`users/login`, options);
  },
  register: (post) => {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(post)
    }
    return fetchRequest(`users/register`, options);
  },
  logout: () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify()
    }
    return fetchRequest(`users/logout`, options);
  },
};

const fetchRequest = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => {
      return res.json()
    })
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};