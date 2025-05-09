// 1) Fetch Data from these two sources and return the faster response: https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users .
// Use either fetch or axios.

async function FasterFetch() {
  const sources = [
    "https://dummyjson.com/users",
    "https://jsonplaceholder.typicode.com/users",
  ];

  const data = sources.map((d) => fetch(d).then((res) => res.json()));

  try {
    const result = await Promise.any(data);
    console.log(result);
    return result;
  } catch (error) {}
}

FasterFetch();

// 2) Write three promises that return arrays after different time intervals:
// Two should be resolve successfully.
// One should be reject.
// Merge the only fulfilled promises

const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve([1, 2, 3]), 1000);
});

const promise2 = new Promise((_, reject) => {
  setTimeout(() => reject("failed"), 1500);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve([4, 5, 6]), 2000);
});

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  const fulfilledArrays = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const merged = [].concat(...fulfilledArrays);
  console.log(merged);
});

// You said:
// 3) Use these APIs: https://fakestoreapi.com/users  and https://jsonplaceholder.typicode.com/users Fetch data from both endpoints and display the combined data only if both promises are fulfilled successfully.

async function fetchUsers() {
  const urls = [
    "https://fakestoreapi.com/users",
    "https://jsonplaceholder.typicode.com/users",
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((res) => res.json()));
  const combined = [...data[0], ...data[1]];
  console.log(combined);
}

fetchUsers();

//   4) Create a function that logs mouse coordinate after mouse stop moving. use debauncer technique.

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
const mousePosition = debounce((e) => {
  console.log(e.clientX, e.clientY);
}, 300);

document.addEventListener("mousemove", mousePosition);

// 5) Create a Input in html, when user typing something on it you should fetch data from this API: https://dummyjson.com/products/search?q=phone as you see there is a products where you can searching something. Replace 'phone' to user typed value and display the result, use debaunce technique to optimize performance.

const input = document.getElementById("search");
const results = document.getElementById("results");

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

async function fetchData(query) {
  if (!query.trim()) {
    results.innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`
  );
  const data = await response.json();
  const products = data.products;

  results.innerHTML = products.map((p) => `<div>${p.title}</div>`).join("");
}

const debouncedFetch = debounce((e) => fetchData(e.target.value), 300);
input.addEventListener("input", debouncedFetch);
