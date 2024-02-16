const express = require("express");

const router = express.Router();
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
router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((user) => {
    return user.creator === userId;
  });
  res.json({ place });
});

module.exports = router;
