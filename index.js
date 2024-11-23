const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const hotelsData = require('./hotel.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

function sortTableDataInOrder(type, data) {
  let hotelData = data.slice();
  if (type === 'low-to-high') {
    hotelData.sort((p1, p2) => p1.price - p2.price);
  } else if (type === 'high-to-low') {
    hotelData.sort((p1, p2) => p2.price - p1.price);
  }
  return hotelData;
}

function sortTableDataInRating(type, data) {
  let hotelDataForRating = data.slice();
  if (type === 'low-to-high') {
    hotelDataForRating.sort((p1, p2) => p1.rating - p2.rating);
  } else if (type === 'high-to-low') {
    hotelDataForRating.sort((p1, p2) => p2.rating - p1.rating);
  }
  return hotelDataForRating;
}

function sortTableDataInReview(type, data) {
  let hotelDataForReview = data.slice();
  if (type === 'least-to-most') {
    hotelDataForReview.sort((p1, p2) => p1.reviews - p2.reviews);
  } else if (type === 'most-to-least') {
    hotelDataForReview.sort((p1, p2) => p2.reviews - p1.reviews);
  }
  return hotelDataForReview;
}

app.get('/hotels/sort/pricing', (req, res) => {
  let hotelPriceDataSortType = req.query.pricing;
  let sortedHotelsData = sortTableDataInOrder(
    hotelPriceDataSortType,
    hotelsData
  );
  res.json({ hotels: sortedHotelsData });
});

app.get('/hotels/sort/rating', (req, res) => {
  let hotelRatingDataSortType = req.query.rating;
  let sortedHotelRatingData = sortTableDataInRating(
    hotelRatingDataSortType,
    hotelsData
  );
  res.json({ hotels: sortedHotelRatingData });
});

app.get('/hotels/sort/reviews', (req, res) => {
  let hotelReviewDataSortType = req.query.reviews;
  let sortedHotelReviewData = sortTableDataInReview(
    hotelReviewDataSortType,
    hotelsData
  );
  res.json({ hotels: sortedHotelReviewData });
});

app.get('/hotels/filter/amenity', (req, res) => {
  let hotelFilterOnAmenity = req.query.amenity;
  let filterDataForAmenity = hotelsData.filter(
    (data) => data.amenity.toLowerCase() === hotelFilterOnAmenity.toLowerCase()
  );
  res.json({ hotels: filterDataForAmenity });
});

app.get('/hotels/filter/country', (req, res) => {
  let hotelFilterOnCountry = req.query.country;
  let filterDataForCountry = hotelsData.filter(
    (data) => data.country.toLowerCase() === hotelFilterOnCountry.toLowerCase()
  );
  res.json({ hotels: filterDataForCountry });
});

app.get('/hotels/filter/category', (req, res) => {
  let hotelFilterOnCategory = req.query.category;
  let filterDataForCategory = hotelsData.filter(
    (data) =>
      data.category.toLowerCase() === hotelFilterOnCategory.toLowerCase()
  );
  res.json({ hotels: filterDataForCategory });
});

app.get('/hotels', (req, res) => {
  let hotelsDataClone = hotelsData.slice();
  res.json({ hotels: hotelsDataClone });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
