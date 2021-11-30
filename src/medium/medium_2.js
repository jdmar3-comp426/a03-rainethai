import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
	avgMpg: {
		city: getStatistics(mpg_data.map((a) => a.city_mpg)).mean,
		highway: getStatistics(mpg_data.map((a) => a.highway_mpg)).mean,
	},
	allYearStats: getStatistics(mpg_data.map((a) => a.year)),
	ratioHybrids: mpg_data.filter((a) => a.hybrid).length / mpg_data.length,
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
	makerHybrids: undefined,
	avgMpgByYearAndHybrid: undefined,
};

let moreStats.makerHybrids = [];

mpg_data.forEach((a) => {
	let bool = false;
	if (a.hybrid) {
		moreStats.makerHybrids.forEach((b) => {
			if (b["make"] == a.make) {
				b["hybrids"].push(a.id);
				bool = true;
			}
		});
		if (!bool) {
			let arr = [];
			arr.push(a.id);
			let val = {
				make: a.make,
				hybrids: arr,
			};
			moreStats.makerHybrids.push(val);
		}
	}
});
moreStats.makerHybrids.sort((a, b) => b["hybrids"].length - a["hybrids"].length);

mpg_data.forEach((k) => {
	if (obj[k.year] == undefined) {
		obj[k.year] = {
			hybrid: {
				city: [],
				highway: [],
			},
			notHybrid: {
				city: [],
				highway: [],
			},
		};
	}
	if (k.hybrid) {
		obj[k.year]["hybrid"]["city"].push(k.city_mpg);
		obj[k.year]["hybrid"]["highway"].push(k.highway_mpg);
	} else if (!k.hybrid) {
		obj[k.year]["notHybrid"]["city"].push(k.city_mpg);
		obj[k.year]["notHybrid"]["highway"].push(k.highway_mpg);
	}
});

for (let key in obj) {
	obj[key]["hybrid"]["city"] = getStatistics(obj[key]["hybrid"]["city"]).mean;
	obj[key]["hybrid"]["highway"] = getStatistics(
		obj[key]["hybrid"]["highway"]
	).mean;
	obj[key]["notHybrid"]["city"] = getStatistics(
		obj[key]["notHybrid"]["city"]
	).mean;
	obj[key]["notHybrid"]["highway"] = getStatistics(
		obj[key]["notHybrid"]["highway"]
	).mean;
}
moreStats.avgMpgByYearAndHybrid = obj;
