//create element
const bookSubmit = document.getElementById("bookSubmit");

//button event
bookSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const iscompleteBook = document.getElementById("inputBookIsComplete").checked;

  if (titleBook !== "" && authorBook !== "" && yearBook !== "") {
    let idBook = +new Date().getTime();
    let dataBook = {
      id: idBook,
      title: titleBook,
      author: authorBook,
      year: yearBook,
      isComplete: iscompleteBook,
    };

    if (localStorage.getItem("Books")) {
      let books = JSON.parse(localStorage.getItem("Books"));
      books.push(dataBook);
      localStorage.setItem("Books", JSON.stringify(books));
      tampilData();
      console.log(books);
    } else {
      let books = [];
      localStorage.setItem("Books", JSON.stringify(books));
      let newbooks = JSON.parse(localStorage.getItem("Books"));
      newbooks.push(dataBook);
      localStorage.setItem("Books", JSON.stringify(newbooks));
      tampilData();
      console.log(books);
    }
  }
});

//hapusdata
function hapusData(id) {
  let books = JSON.parse(localStorage.getItem("Books"));

  let index = books.findIndex((book) => book.id === id);

  books.splice(index, 1);

  localStorage.setItem("Books", JSON.stringify(books));

  tampilData();
}

//tampildata

function tampilData() {
  const books = JSON.parse(localStorage.getItem("Books"));
  const completeList = document.getElementById("completeBookshelfList");
  const incompleteList = document.getElementById("incompleteBookshelfList");

  completeList.innerHTML = "";
  incompleteList.innerHTML = "";

  books.forEach((element) => {
    const article = document.createElement("ARTICLE");
    article.classList.add("book_item");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(p2);
    h3.innerText = element.title;
    p.innerText = `Penulis: ${element.author}`;
    p2.innerText = `Tahun: ${element.year}`;
    const div = document.createElement("div");
    div.classList.add("action");
    const greenButton = document.createElement("button");
    greenButton.classList.add("green");
    const redButton = document.createElement("button");
    redButton.classList.add("red");
    redButton.innerText = "Hapus buku";
    div.appendChild(greenButton);
    div.appendChild(redButton);
    article.appendChild(div);

    if (element.isComplete) {
      greenButton.innerText = "Belum selesai di Baca";
      incompleteList.appendChild(article);
    } else {
      greenButton.innerText = "Selesai Baca";
      completeList.appendChild(article);
    }

    greenButton.addEventListener("click", function () {
      element.isComplete = !element.isComplete;
      localStorage.setItem("Books", JSON.stringify(books));
      tampilData();
    });

    redButton.addEventListener("click", function () {
      hapusData(element.id);
    });
  });
}

// Cari Buku
const searchForm = document.getElementById("searchBook");
const searchInput = document.getElementById("searchBookTitle");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const keyword = searchInput.value.toLowerCase();
  const books = JSON.parse(localStorage.getItem("Books"));
  const searchResult = books.filter((book) => book.title.toLowerCase().includes(keyword));

  if (searchResult.length > 0) {
    const completeList = document.getElementById("completeBookshelfList");
    const incompleteList = document.getElementById("incompleteBookshelfList");
    completeList.innerHTML = "";
    incompleteList.innerHTML = "";

    searchResult.forEach((element) => {
      const article = document.createElement("ARTICLE");
      article.classList.add("book_item");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const p2 = document.createElement("p");
      article.appendChild(h3);
      article.appendChild(p);
      article.appendChild(p2);
      h3.innerText = element.title;
      p.innerText = `Penulis: ${element.author}`;
      p2.innerText = `Tahun: ${element.year}`;
      const div = document.createElement("div");
      div.classList.add("action");
      const greenButton = document.createElement("button");
      greenButton.classList.add("green");
      const redButton = document.createElement("button");
      redButton.classList.add("red");
      redButton.innerText = "Hapus buku";
      div.appendChild(greenButton);
      div.appendChild(redButton);
      article.appendChild(div);

      if (element.isComplete) {
        greenButton.innerText = "Belum selesai di Baca";
        incompleteList.appendChild(article);
      } else {
        greenButton.innerText = "Selesai Baca";
        completeList.appendChild(article);
      }

      greenButton.addEventListener("click", function () {
        element.isComplete = !element.isComplete;
        localStorage.setItem("Books", JSON.stringify(books));
        tampilData();
      });

      redButton.addEventListener("click", function () {
        hapusData(element.id);
      });
    });
  } else {
    alert("Buku tidak ditemukan");
  }

  // reset form
  searchForm.reset();
});

tampilData();
