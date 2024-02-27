const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Garrison Public Library, Multan",
    description: "One of the finest and aesthetic library in Multan",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipO5rEOYQVT5u6mmhrfKi2PV07K-Wa_9kuikkzAd=s680-w680-h510",
    address:
      "Garrison Public Library Multan, Near Askari Phase-I, Sher Shah Road, Defence Officer Colony, Multan, Punjab, Pakistan",
    location: {
      lat: "30.1657276",
      lng: "71.4071088",
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not found the place for provided id.", 404);
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((user) => {
    return user.creator === userId;
  });
  if (!place) {
    return next(
      new HttpError("Could not found the place for provided user id.", 404)
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
