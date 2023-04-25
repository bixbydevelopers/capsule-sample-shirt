import * as lib from "./lib/util";
import SHIRTS from "./lib/shirts";

// FindShirt
export default function ({
  searchTerm,
  style,
  brand,
  gender,
  minPrice,
  maxPrice,
}) {
  var records = SHIRTS;
  if (searchTerm) {
    records = lib.findShirts(SHIRTS, searchTerm);
  }
  if (brand) {
    records = records.filter(function (record) {
      return record.brand.toLowerCase() == brand.toString().toLowerCase();
    });
  }
  if (style) {
    records = records.filter(function (record) {
      return record.style.toLowerCase() == style.toString().toLowerCase();
    });
  }
  if (gender) {
    records = records.filter(function (record) {
      return record.gender.toLowerCase() == gender.toString().toLowerCase();
    });
  }
  if (minPrice) {
    records = records.filter(function (record) {
      return record.price.value > minPrice.value;
    });
  }
  if (maxPrice) {
    records = records.filter(function (record) {
      return record.price.value < maxPrice.value;
    });
  }
  return records;
}
