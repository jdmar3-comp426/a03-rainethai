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
	avgMpgByYearAndHybrid: mpg_data.reduce((acc, val) => {
		if (!acc[val.year]) {
			const hybrid = {
				city: getStatistics(
					mpg_data
						.filter((car) => car.year === val.year)
						.filter((car) => car.hybrid)
						.map((car) => car.city_mpg)
				).mean,
				highway: getStatistics(
					mpg_data
						.filter((car) => car.year === val.year)
						.filter((car) => car.hybrid)
						.map((car) => car.highway_mpg)
				).mean,
			};
			const notHybrid = {
				city: getStatistics(
					mpg_data
						.filter((car) => car.year === val.year)
						.filter((car) => !car.hybrid)
						.map((car) => car.city_mpg)
				).mean,
				highway: getStatistics(
					mpg_data
						.filter((car) => car.year === val.year)
						.filter((car) => !car.hybrid)
						.map((car) => car.highway_mpg)
				).mean,
			};
			acc[val.year] = {
				hybrid,
				notHybrid,
			};
		}
		return acc;
	}, {}),
};

/* array.forEach((element) => {
	if (element[key] == 2009) {
		if (element.hybrid == true) {
			temp[2009].hybrid.city += element.city_mpg;
			temp[2009].hybrid.highway += element.highway_mpg;
			temp[2009].hybrid.counter += 1;
		} else {
			temp[2009].notHybrid.city += element.city_mpg;
			temp[2009].notHybrid.highway += element.highway_mpg;
			temp[2009].notHybrid.counter += 1;
		}
	} else if (element[key] == 2010) {
		if (element.hybrid == true) {
			temp[2010].hybrid.city += element.city_mpg;
			temp[2010].hybrid.highway += element.highway_mpg;
			temp[2010].hybrid.counter += 1;
		} else {
			temp[2010].notHybrid.city += element.city_mpg;
			temp[2010].notHybrid.highway += element.highway_mpg;
			temp[2010].notHybrid.counter += 1;
		}
	} else if (element[key] == 2011) {
		if (element.hybrid == true) {
			temp[2011].hybrid.city += element.city_mpg;
			temp[2011].hybrid.highway += element.highway_mpg;
			temp[2011].hybrid.counter += 1;
		} else {
			temp[2011].notHybrid.city += element.city_mpg;
			temp[2011].notHybrid.highway += element.highway_mpg;
			temp[2011].notHybrid.counter += 1;
		}
	} else {
		if (element.hybrid == true) {
			temp[2012].hybrid.city += element.city_mpg;
			temp[2012].hybrid.highway += element.highway_mpg;
			temp[2012].hybrid.counter += 1;
		} else {
			temp[2012].notHybrid.city += element.city_mpg;
			temp[2012].notHybrid.highway += element.highway_mpg;
			temp[2012].notHybrid.counter += 1;
		}
	}
});

for (let i = 0; i < 4; i++) {
	temp[2009 + i].hybrid.city =
		temp[2009 + i].hybrid.city / temp[2009 + i].hybrid.counter;
	temp[2009 + i].hybrid.highway =
		temp[2009 + i].hybrid.highway / temp[2009 + i].hybrid.counter;
	delete temp[2009 + i].hybrid.counter;
	temp[2009 + i].notHybrid.city =
		temp[2009 + i].notHybrid.city / temp[2009 + i].notHybrid.counter;
	temp[2009 + i].notHybrid.highway =
		temp[2009 + i].notHybrid.highway / temp[2009 + i].notHybrid.counter;
	delete temp[2009 + i].notHybrid.counter;
}
return temp;
*/
