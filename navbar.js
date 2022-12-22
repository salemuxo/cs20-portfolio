// adds active tag to currently selected nav page
document
  .querySelectorAll(
    `a[href='${window.location.pathname.replace(/\//, "")}']`
  )[0]
  .classList.add("active");
