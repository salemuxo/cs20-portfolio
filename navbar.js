document
  .querySelectorAll(
    `a[href='${window.location.pathname.replace(/\//, "")}']`
  )[0]
  .classList.add("active");
