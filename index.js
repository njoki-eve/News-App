const API_KEY = "bedc3d3998de4bd781b0847cd28cfecd";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const loadNewsButton = document.getElementById('load-news');
const searchInput = document.getElementById('search');
const newsContainer = document.getElementById('news-container');

const createNewsCard = (newsItem) => {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');
  
  const title = document.createElement('h2');
  title.textContent = newsItem.title;
  
  const description = document.createElement('p');
  description.textContent = newsItem.description || 'No description available.';
  
  const link = document.createElement('a');
  link.href = newsItem.url;
  link.target = "_blank";
  link.textContent = "Read more";
  
  // comment section
  const commentSection = document.createElement('div');
  commentSection.classList.add('comment-section');
  
  const commentInput = document.createElement('input');
  commentInput.placeholder = "Add a comment...";
  
  const commentButton = document.createElement('button');
  commentButton.textContent = "Submit Comment";
  
  
  commentButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentDisplay = document.createElement('p');
      commentDisplay.textContent = `Comment: ${commentText}`;
      commentSection.appendChild(commentDisplay);
      commentInput.value = ''; 
    }
  });
  
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);
  
  newsCard.appendChild(title);
  newsCard.appendChild(description);
  newsCard.appendChild(link);
  newsCard.appendChild(commentSection);
  
  return newsCard;
};

// Fetch News
const fetchNews = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    
    if (data.articles) {
      newsContainer.innerHTML = ''; 
      data.articles.forEach((article) => {
        const newsCard = createNewsCard(article);
        newsContainer.appendChild(newsCard);
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Dark mode 
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};


const searchNews = () => {
  const query = searchInput.value.toLowerCase();
  const newsItems = document.querySelectorAll('.news-card');
  
  newsItems.forEach((newsCard) => {
    const title = newsCard.querySelector('h2').textContent.toLowerCase();
    const description = newsCard.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(query) || description.includes(query)) {
      newsCard.style.display = 'block';
    } else {
      newsCard.style.display = 'none';
    }
  });
}

loadNewsButton.addEventListener('click', fetchNews); 
toggleDarkModeButton.addEventListener('click', toggleDarkMode);
searchInput.addEventListener('input', searchNews); 


fetchNews();
