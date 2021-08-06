const { response } = require("express");
const Movie = require("../models/Movie");

const getMovies = async (req, res = response) => {
  try {
    const {
      page = 1,
      limit = 10,
      order = "releaseYear",
      year,
      type,
      title,
    } = req.query;
    const where = {};
    const skip = (+page - 1) * +limit;

    const index = order.indexOf("-");
    const sort = {
      [index !== -1 ? order?.replace("-", "") : order]:
        index !== -1 ? "asc" : "desc",
    };

    if (year) {
      where["releaseYear"] = year;
    }
    if (type) {
      where["programType"] = type;
    }
    if (title) {
      where["title"] = { $regex: ".*" + title + ".*" };
    }

    if (page < 1) {
      return res.status(400).json({
        ok: false,
        error: "The page must be greater than 0",
      });
    }

    if (limit < 1) {
      return res.status(400).json({
        ok: false,
        error: "The limit must be greater than 0",
      });
    }

    const movies = await Movie.find(where)
      .skip(skip)
      .limit(+limit)
      .sort(sort)
      .exec();

    const total =
      !year && !type && !title ? await Movie.countDocuments() : movies.length;

    res.json({
      ok: true,
      results: movies,
      links: {
        previous: skip > 0 && movies.length > 0 ? true : false,
        next: +limit + skip < total ? true : false,
      },
      total,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      error: "Oops something went wrong.",
    });
  }
};

module.exports = {
  getMovies,
};
