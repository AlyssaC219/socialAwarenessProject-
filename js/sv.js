let pictures = ["social-awareness-picture-books.png", "youtube-screenshot .png"];

let descriptions = [
  "Use these evidence-based social skills demonstrations to help you build your social behaviors and learn how their actions in the video affect others. With these demo examples, you can become more independent and maintain healthy relationships throughout your life. Please follow the examples from the video before you continue onto the next page. ",
  "Check out these comments from the self-awareness video:"
];

let nextPage = "Multiple Choice Task Video";

let rightSection = document.querySelector("#rightSection");
for (let i = 0; i < pictures.length; i++) {
  let list = document.createElement("div");
  let left = document.createElement("div");
  let right = document.createElement("div");
  list.appendChild(left);
  list.appendChild(right);
  list.setAttribute("class", "list-wrapper");
  left.setAttribute("class", "image");
  right.setAttribute("class", "description");
  let imageTag = document.createElement("img");
  imageTag.setAttribute("width", "50px"); //
  imageTag.setAttribute("src", "./" + pictures[i]);
  left.appendChild(imageTag);
  right.innerText = descriptions[i];

  rightSection.appendChild(list);
}

let button = document.querySelector("#btn");
button.addEventListener("click", (event) => {
  console.log("123");
  location.href = nextPage;
});
