async function loadInitialPosts() {
  const stored = getPosts();
  if (stored.length === 0) {
    const res = await fetch("posts.json");
    const data = await res.json();
    savePosts(data);
  }
}

function addPost(content) {
  const post = {
    user,
    date,
    content,
    image,
    likes,
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
};

class PostCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const id = this.getAttribute('id')
    const user = this.getAttribute('user')
    const date = this.getAttribute('content') 
    const content = this.getAttribute('date') 
    const image = this.getAttribute('image')
    const likes = this.getAttribute('likes')
    const comments = this.getAttribute('comments')

    this.shadowRoot.innerHTML = `
      <style>
        .post-card {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .post-card strong {
          display: block;
          margin-bottom: 5px;
        }
        .post-card small {
          color: #666;
        }
      </style>
      <div class="post-card">