
 
 //Toggle menu function
 const hamburger = document.getElementById('hamburger');
 const navLinks = document.querySelector('.nav-links');

 hamburger.addEventListener('click', () => {
     navLinks.classList.toggle('show');
     hamburger.classList.toggle('active');
 });


 // Close menu when clicking outside
 document.addEventListener('click', (e) => {
     if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
         hamburger.classList.remove('active');
         nav.classList.remove('active');
     }
 });

 //  Function to update heart icon appearance
function updateHeartIcon(name, isFavorite) {
  const productElements = document.querySelectorAll('.flex-item');
  
  productElements.forEach(item => {
    if (item.querySelector('h3').textContent === name) {
      const heartIcon = item.querySelector('.img');
      if (isFavorite) {
        heartIcon.classList.add('favorite-active');
      } else {
        heartIcon.classList.remove('favorite-active');
      }
    }
  });
}


// Function to load favorites status on page load
function loadFavoritesStatus() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  
  favorites.forEach(favorite => {
    updateHeartIcon(favorite.name, true);
  });
}


//  Function to display favorites on the favorites page
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  const favoritesContainer = document.getElementById('favorites-container');
  
  // Clear container
  favoritesContainer.innerHTML = '';
  
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p class="empty-favorites">No favorites added yet.</p>';
    return;
  }
  
  // Add each favorite item
  favorites.forEach(item => {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = 'flex-item';
    favoriteItem.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <h4 class="inline-paragraph">$${item.price}</h4>
      <div class="cart">
        <img alt="vector" class="img favorite-active" src="🦆 icon _heart_ (1).png" onclick="toggleFavorite('${item.name}', '${item.price}', '${item.image}')">
        <button onclick="addToCart('${item.name}', '${item.price}', '${item.image}')">Add to cart</button>
      </div>
    `;
    favoritesContainer.appendChild(favoriteItem);
  });
}

// Call loadFavoritesStatus when the products page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the products page
  if (document.querySelectorAll('.flex-item').length > 0) {
    loadFavoritesStatus();
    

    // Add click event listeners to all heart icons
    document.querySelectorAll('.img').forEach(heartIcon => {
      heartIcon.addEventListener('click', function() {
        const productElement = this.closest('.flex-item');
        const name = productElement.querySelector('h3').textContent;
        const price = productElement.querySelector('.inline-paragraph').textContent.replace('$', '');
        const image = productElement.querySelector('img').src;
        
        toggleFavorite(name, price, image);
      });
    });
  }
  
  // Check if we're on the favorites page
  if (document.getElementById('favorites-container')) {
    displayFavorites();
  }
});
        

// Create a span element for favorites count
function createFavoritesCountElement() {
  // Check if the span already exists
  if (!document.getElementById('favorites-count')) {
    const favoritesCountSpan = document.createElement('span');
    favoritesCountSpan.id = 'favorites-count';
    favoritesCountSpan.className = 'count-badge';
    favoritesCountSpan.textContent = '0';
    
    // Find the hearts icon in the nav
    const heartsLink = document.querySelector('a[href*="favorites.html"]');
    if (heartsLink) {
      heartsLink.appendChild(favoritesCountSpan);
    }
  }
}

// Update favorites count in the nav
function updateFavoritesCount() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesCount = document.getElementById('favorites-count');
  
  if (favoritesCount) {
    favoritesCount.textContent = favorites.length;
    
    // Show/hide the count based on if there are favorites
    if (favorites.length > 0) {
      favoritesCount.style.display = 'flex';
    } else {
      favoritesCount.style.display = 'none';
    }
  }
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // Create the favorites count element
  createFavoritesCountElement();
  
  // Update the count
  updateFavoritesCount();
  
  // Call updateFavoritesCount() after any toggling of favorites
  // Add this line to the end of your toggleFavorite function:
  // updateFavoritesCount();
});

// Modify your existing toggleFavorite function to update the count
// Add this line at the end of your toggleFavorite function:
// updateFavoritesCount();
