async function loadInitialPosts() {
  const stored = getPosts();
  if (stored.length === 0) {
    const res = await fetch("posts.json");
    const data = await res.json();
    savePosts(data);
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(content) {
  const user = localStorage.getItem("currentUser");
  const post = {
    user,
    content,
    date: new Date().toLocaleString()
  };
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
}

addPostBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  if (content === "") return;
  addPost(content);
  postContent.value = "";
  loadPosts();
});

function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `<strong>${post.user}</strong><br>${post.content}<br><small>${post.date}</small>`;
    postsContainer.appendChild(div);
  });
}

function loadPosts() {
  let posts = getPosts();
  renderPosts(posts);
}

window.onload = async () => {
  await loadInitialPosts();
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    showMainPage(currentUser);
  }
};


