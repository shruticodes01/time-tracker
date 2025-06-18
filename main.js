"use strict";

const reportLinks = document.querySelectorAll(".link__item");
const currentReports = document.querySelectorAll(".current");
const previousReports = document.querySelectorAll(".previous");

const currentData = [];
const previousData = [];

currentReports.forEach((currentEl) => {
  currentData.push(currentEl);
});

previousReports.forEach((previousEl) => {
  previousData.push(previousEl);
});

const addCurrentReport = function (title, current) {
  currentData.forEach((currentEl) => {
    currentEl.id = currentEl.parentElement.id;

    if (currentEl.id === title.toLowerCase()) {
      if (current <= 1) {
        currentEl.textContent = `${current}hr`;
      } else {
        currentEl.textContent = `${current}hrs`;
      }
    }
  });
};

const addPreviousReport = function (title, previous) {
  previousData.forEach((previousEl) => {
    previousEl.id = previousEl.parentElement.id;

    if (previousEl.id === title.toLowerCase()) {
      if (previous <= 1) {
        previousEl.textContent = `Previous - ${previous}hr`;
      } else {
        previousEl.textContent = `Previous - ${previous}hrs`;
      }
    }
  });
};

// Solution: 1 --- Problem --- Loads data 3 times.

// reportLinks.forEach((link) => {
//   const fetchData = fetch("/data.json");
//   fetchData
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//       console.log(fetchData);

//       return response.json();
//     })
//     .then((data) => {
//       link.addEventListener("click", function () {
//         console.log(data);

//         for (const { title, timeframes } of data) {
//           console.log(title);
//           console.log(timeframes);

//           for (const [period, { current, previous }] of Object.entries(
//             timeframes
//           )) {
//             if (link.id === period) {
//               console.log(link);
//               console.log(current);
//               console.log(previous);
//               addCurrentReport(title, current);
//               addPreviousReport(title, previous);
//             }
//           }
//         }
//       });
//     });
// });

// Improved Solution

let loadedData = null;

const fetchData = fetch("/data.json");
fetchData
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    console.log(fetchData);
    return response.json();
  })
  .then((data) => {
    loadedData = data;
  });

reportLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (!loadedData) {
      console.log("No data loaded");
      return;
    }
    for (const { title, timeframes } of loadedData) {
      console.log(loadedData);

      for (const [period, { current, previous }] of Object.entries(
        timeframes
      )) {
        if (link.id === period) {
          addCurrentReport(title, current);
          addPreviousReport(title, previous);
        }
      }
    }
  });
});

// const fetchData = fetch("/data.json");
// fetchData
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     console.log(fetchData);
//     return response.json();
//   })
//   .then((data) => {
//     loadedData = data;
//   });
