function fetchData() {
  const url = document.getElementById("url").value;
  const result = document.getElementById("result");
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      const html = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const title = doc.querySelector("title").textContent;
      const headers = [...doc.querySelectorAll("h1, h2, h3, h4, h5, h6")]
        .map(header => header.textContent);
      const paragraphs = [...doc.querySelectorAll("p")]
        .map(paragraph => paragraph.textContent);
      const resultHTML = `
        <h2>${title}</h2>
        ${headers.map(header => `<h3>${header}</h3>`).join("")}
        ${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
      `;
      result.innerHTML = resultHTML;
    })
    .catch(error => {
      console.error(error);
      result.innerHTML = "An error occurred. Please check your URL and try again.";
    });
}
