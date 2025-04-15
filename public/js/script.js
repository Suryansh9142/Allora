// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#navbar ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if ((currentPath === '/' && linkPath === '/') || 
            (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.parentElement.style.transform = 'scale(1.05)';
            link.parentElement.style.borderStyle = 'inset';
            link.parentElement.style.borderTop = 'none';
            link.parentElement.style.borderBottom = 'inset';
            link.parentElement.style.borderLeft = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to cards when they come into view
    const cards = document.querySelectorAll('.card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
            observer.observe(card);
        });
    }

    // Add hover effects for cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Improved Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Find the appropriate elements to search based on the current page
            let items = document.querySelectorAll('.card');
            
            // If search term is empty, show all items
            if (searchTerm === '') {
                items.forEach(item => {
                    item.style.display = '';
                });
                return;
            }
            
            // Count for visible items
            let visibleCount = 0;
            
            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show a message if no results found
            let noResultsMsg = document.getElementById('no-results-message');
            if (visibleCount === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('p');
                    noResultsMsg.id = 'no-results-message';
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = 'No results found for "' + searchTerm + '". Try a different search term.';
                    const cardGrid = document.querySelector('.card-grid');
                    if (cardGrid) {
                        cardGrid.parentNode.insertBefore(noResultsMsg, cardGrid.nextSibling);
                    }
                } else {
                    noResultsMsg.textContent = 'No results found for "' + searchTerm + '". Try a different search term.';
                    noResultsMsg.style.display = 'block';
                }
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
        
        // Add clear button functionality
        const searchContainer = searchInput.parentElement;
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-search';
        clearButton.innerHTML = '&times;';
        clearButton.style.display = 'none';
        searchContainer.appendChild(clearButton);
        
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value ? 'block' : 'none';
        });
        
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            this.style.display = 'none';
            searchInput.focus();
        });
    }

    // Genre tag filtering
    const genreTags = document.querySelectorAll('.genre-tag');
    genreTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const genre = this.textContent.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            // Clear search input when filtering by genre
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
                const clearButton = document.querySelector('.clear-search');
                if (clearButton) clearButton.style.display = 'none';
            }
            
            // Remove active class from all tags
            genreTags.forEach(t => t.classList.remove('active'));
            
            // If clicking on already filtered genre, show all
            if (this.classList.contains('filtered')) {
                this.classList.remove('filtered');
                cards.forEach(card => {
                    card.style.display = '';
                });
                return;
            }
            
            // Add active class to clicked tag
            this.classList.add('active', 'filtered');
            
            let visibleCount = 0;
            cards.forEach(card => {
                const description = card.querySelector('p').textContent.toLowerCase();
                if (description.includes(genre)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show a message if no results found
            let noResultsMsg = document.getElementById('no-results-message');
            if (visibleCount === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('p');
                    noResultsMsg.id = 'no-results-message';
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = 'No content found in the "' + genre + '" genre.';
                    const cardGrid = document.querySelector('.card-grid');
                    if (cardGrid) {
                        cardGrid.parentNode.insertBefore(noResultsMsg, cardGrid.nextSibling);
                    }
                } else {
                    noResultsMsg.textContent = 'No content found in the "' + genre + '" genre.';
                    noResultsMsg.style.display = 'block';
                }
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenuLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navMenuLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navMenuLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenuLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenuLinks.classList.contains('active')) {
            navMenuLinks.classList.remove('active');
        }
    });

    // Existing code for slider functionality
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const maxSlide = slides.length - 1;
        
        // Functions
        const goToSlide = function(slide) {
            slides.forEach((s, i) => {
                s.style.transform = `translateX(${100 * (i - slide)}%)`;
            });
        };
        
        // Next slide
        const nextSlide = function() {
            if (currentSlide === maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            
            goToSlide(currentSlide);
        };
        
        // Previous slide
        const prevSlide = function() {
            if (currentSlide === 0) {
                currentSlide = maxSlide;
            } else {
                currentSlide--;
            }
            
            goToSlide(currentSlide);
        };
        
        // Initial position
        const init = function() {
            goToSlide(0);
        };
        init();
        
        // Event handlers
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // User Account and Modal Functionality
    const userIcon = document.querySelector('.user-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // User login state management
    let isLoggedIn = false;
    let currentUser = null;
    
    // Function to update user icon based on login state
    function updateUserIcon() {
        const iconElement = userIcon.querySelector('i');
        const existingImg = userIcon.querySelector('img');
        
        if (isLoggedIn && currentUser) {
            // If user is logged in and has profile image
            if (existingImg) {
                // Update existing image
                existingImg.src = currentUser.profileImage;
                existingImg.alt = currentUser.name;
            } else {
                // Create new image element
                if (iconElement) iconElement.style.display = 'none';
                const img = document.createElement('img');
                img.src = currentUser.profileImage;
                img.alt = currentUser.name;
                userIcon.prepend(img);
            }
            
            // Update dropdown menu options for logged-in user
            if (dropdownMenu) {
                dropdownMenu.innerHTML = `
                    <div class="dropdown-item" id="profile-btn">My Profile</div>
                    <div class="dropdown-item" id="settings-btn">Settings</div>
                    <div class="dropdown-item" id="logout-btn">Logout</div>
                `;
                
                // Add event listeners for new menu items
                document.getElementById('profile-btn').addEventListener('click', function() {
                    // Navigate to profile page
                    window.location.href = '/user/profile';
                    dropdownMenu.classList.remove('show');
                });
                
                document.getElementById('settings-btn').addEventListener('click', function() {
                    // Navigate to settings page
                    window.location.href = '/user/profile/edit';
                    dropdownMenu.classList.remove('show');
                });
                
                document.getElementById('logout-btn').addEventListener('click', function() {
                    // Handle logout
                    logoutUser();
                    dropdownMenu.classList.remove('show');
                });
            }
        } else {
            // If user is not logged in, show default icon
            if (existingImg) existingImg.remove();
            if (iconElement) iconElement.style.display = 'block';
            
            // Reset dropdown menu to login/register options
            if (dropdownMenu) {
                dropdownMenu.innerHTML = `
                    <div class="dropdown-item" id="login-btn">Login</div>
                    <div class="dropdown-item" id="register-btn">Register</div>
                `;
                
                // Re-add event listeners for login/register buttons
                document.getElementById('login-btn').addEventListener('click', function() {
                    loginModal.style.display = 'block';
                    dropdownMenu.classList.remove('show');
                });
                
                document.getElementById('register-btn').addEventListener('click', function() {
                    registerModal.style.display = 'block';
                    dropdownMenu.classList.remove('show');
                });
            }
        }
    }
    
    // Function to handle user login
    function loginUser(userData) {
        isLoggedIn = true;
        currentUser = userData;
        
        // Store user data in localStorage for persistence
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Update UI
        updateUserIcon();
    }
    
    // Function to handle user logout
    function logoutUser() {
        isLoggedIn = false;
        currentUser = null;
        
        // Clear localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        
        // Update UI
        updateUserIcon();
        
        // Show logout message
        alert('You have been logged out successfully');
    }
    
    // Check if user is already logged in (from localStorage)
    function checkLoginState() {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        const storedUserData = localStorage.getItem('currentUser');
        
        if (storedLoginState === 'true' && storedUserData) {
            isLoggedIn = true;
            currentUser = JSON.parse(storedUserData);
            updateUserIcon();
        }
    }
    
    // Call on page load
    checkLoginState();
    
    // Handle dropdown menu
    if (userIcon) {
        // Toggle dropdown when clicking on the user icon
        userIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideIcon = userIcon.contains(event.target);
            const isClickInsideDropdown = dropdownMenu.contains(event.target);
            
            if (!isClickInsideIcon && !isClickInsideDropdown && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            // Hide dropdown after clicking
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Open register modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            registerModal.style.display = 'block';
            // Hide dropdown after clicking
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Close modals when clicking the X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // Handle form submissions
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show error message
    function showError(inputElement, errorElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add('error');
        errorElement.style.display = 'block';
    }
    
    // Function to hide error message
    function hideError(inputElement, errorElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.remove('error');
        errorElement.style.display = 'none';
    }
    
    // Add input event listeners for email fields
    const loginEmail = document.getElementById('login-email');
    const loginEmailError = document.getElementById('login-email-error');
    const registerEmail = document.getElementById('register-email');
    const registerEmailError = document.getElementById('register-email-error');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');
    const registerPasswordError = document.getElementById('register-password-error');
    
    if (loginEmail && loginEmailError) {
        loginEmail.addEventListener('input', function() {
            if (this.value.trim() !== '' && !validateEmail(this.value)) {
                showError(this, loginEmailError);
            } else {
                hideError(this, loginEmailError);
            }
        });
        
        loginEmail.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !validateEmail(this.value)) {
                showError(this, loginEmailError);
            }
        });
    }
    
    if (registerEmail && registerEmailError) {
        registerEmail.addEventListener('input', function() {
            if (this.value.trim() !== '' && !validateEmail(this.value)) {
                showError(this, registerEmailError);
            } else {
                hideError(this, registerEmailError);
            }
        });
        
        registerEmail.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !validateEmail(this.value)) {
                showError(this, registerEmailError);
            }
        });
    }
    
    if (registerConfirmPassword && registerPasswordError) {
        registerConfirmPassword.addEventListener('input', function() {
            if (this.value !== registerPassword.value) {
                showError(this, registerPasswordError);
            } else {
                hideError(this, registerPasswordError);
            }
        });
        
        registerPassword.addEventListener('input', function() {
            if (registerConfirmPassword.value !== '' && 
                registerConfirmPassword.value !== this.value) {
                showError(registerConfirmPassword, registerPasswordError);
            } else if (registerConfirmPassword.value !== '') {
                hideError(registerConfirmPassword, registerPasswordError);
            }
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validate email before submission
            if (!validateEmail(email)) {
                showError(loginEmail, loginEmailError);
                return;
            }
            
            // Here you would typically send this data to your server
            console.log('Login attempt:', { email, password });
            
            // For demo purposes, simulate successful login with mock user data
            const mockUserData = {
                name: email.split('@')[0],
                email: email,
                profileImage: 'https://ui-avatars.com/api/?name=' + email.split('@')[0] + '&background=random'
            };
            
            // Login the user
            loginUser(mockUserData);
            
            // Close the modal
            loginModal.style.display = 'none';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validate email before submission
            if (!validateEmail(email)) {
                showError(registerEmail, registerEmailError);
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                showError(registerConfirmPassword, registerPasswordError);
                return;
            }
            
            // Here you would typically send this data to your server
            console.log('Registration attempt:', { name, email, password });
            
            // For demo purposes, simulate successful registration with user data
            const userData = {
                name: name,
                email: email,
                profileImage: 'https://ui-avatars.com/api/?name=' + name.replace(' ', '+') + '&background=random'
            };
            
            // Login the user after registration
            loginUser(userData);
            
            // Close the modal
            registerModal.style.display = 'none';
        });
    }

    // Add smooth scrolling for detail page anchor links
    document.querySelectorAll('.detail-actions a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 