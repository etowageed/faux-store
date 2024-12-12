const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  //   console.log("Checkout");

  // fetch("/create-checkout-session", {
  // this is when we're using "public" and client and server are on the same url

  fetch("http://localhost:3000/create-checkout-session", {
    // this fetches the resource from the server
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      //   console.log(url);
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});
