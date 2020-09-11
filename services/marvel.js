const md5 = require("md5");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
const limit = process.env.MARVEL_SEARCH_LIMIT;

class service {
  constructor() {
    this.restclient = axios.create({
      baseURL: "https://gateway.marvel.com/",
      timeout: 10000,
    });
  }

  // getAuthParams description.
  static getAuthParams() {
    const ts = new Date().getMilliseconds();
    return {
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),
      ts,
    };
  }

  // searchCharacters description
  searchCharacters(query = "", page = 0) {
    const params = { ...service.getAuthParams() };

    // Set limit param
    params.limit = limit;

    // Set query param
    if (query) {
      // params.name = query;
      params.nameStartsWith = query;
    }

    // Set offset
    if (page) {
      params.offset = limit * (page - 1);
    }

    // Return promise
    return this.restclient
      .get("v1/public/characters", {
        params: { ...params },
      })
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  }

  // getCharacter description
  getCharacter(id) {
    // Return promise
    return this.restclient
      .get(`v1/public/characters/${id}`, {
        params: { ...service.getAuthParams(), id },
      })
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = service;
