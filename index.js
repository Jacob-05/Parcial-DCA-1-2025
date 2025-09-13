
fetch('post.json')
  .then(res => res.json())
  .then(posts => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${post.image}" alt="Imagen de ${post.user}" style="width:100%;border-radius:8px;">
        <h3>${post.user}</h3>
        <p><strong>Fecha:</strong> ${new Date(post.date).toLocaleString()}</p>
        <p>${post.content}</p>
        <p><strong>Likes:</strong> ${post.likes}</p>
        <div><strong>Comentarios:</strong>
          <ul>
            ${post.comments.map(c => `<li><b>${c.user}:</b> ${c.text}</li>`).join('')}
          </ul>
        </div>
      `;
      app.appendChild(card);
    });
  });

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
        <img src="${image}" alt="Imagen de ${user}" style="width:100%;border-radius:8px;">
        <h3>${user}</h3>
        <p><strong>Fecha:</strong> ${new Date(date).toLocaleString()}</p>
        <p>${content}</p>
        <p><strong>Likes:</strong> ${likes}</p>
        <div><strong>Comentarios:</strong>
          <ul>
            ${comments.map(c => `<li><b>${c.user}:</b> ${c.text}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('post-card', PostCard);


fetch('post.json')
  .then(res => res.json())
  .then(posts => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    posts.forEach(post => {
      const postCard = document.createElement('post-card');
      postCard.setAttribute('id', post.id);
      postCard.setAttribute('user', post.user);
      postCard.setAttribute('date', post.date);
      postCard.setAttribute('content', post.content);
      postCard.setAttribute('image', post.image);
      postCard.setAttribute('likes', post.likes);
      postCard.setAttribute('comments', JSON.stringify(post.comments));
      app.appendChild(postCard);
    });
  });
