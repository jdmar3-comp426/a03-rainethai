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

let res = {};

mpg_data.forEach((mpg) => {
	if (!res[mpg.year]) {
		res[mpg.year] = {
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
	if (mpg.hybrid) {
		res[mpg.year]["hybrid"]["city"].push(mpg.city_mpg);
		res[mpg.year]["hybrid"]["highway"].push(mpg.highway_mpg);
	} else if (!mpg.hybrid) {
		res[mpg.year]["notHybrid"]["city"].push(mpg.city_mpg);
		res[mpg.year]["notHybrid"]["highway"].push(mpg.highway_mpg);
	}
});

for (let key in res) {
	res[key]["hybrid"]["city"] = getStatistics(res[key]["hybrid"]["city"]).mean;
	res[key]["hybrid"]["highway"] = getStatistics(
		res[key]["hybrid"]["highway"]
	).mean;
	res[key]["notHybrid"]["city"] = getStatistics(
		res[key]["notHybrid"]["city"]
	).mean;
	res[key]["notHybrid"]["highway"] = getStatistics(
		res[key]["notHybrid"]["highway"]
	).mean;
}
moreStats.avgMpgByYearAndHybrid = res;
