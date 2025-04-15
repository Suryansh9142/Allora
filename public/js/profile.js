// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile.js loaded successfully');
    
    // Initialize the profile with data from localStorage
    updateProfileFromUserData();
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        console.log('Tab buttons found:', tabButtons.length);
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Tab clicked:', this.getAttribute('data-tab'));
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show the corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                } else {
                    console.error('Tab pane not found:', tabId);
                }
            });
        });
    } else {
        console.log('No tab buttons found on this page');
    }
    
    // Handle watchlist item removal
    const removeButtons = document.querySelectorAll('.btn-remove');
    if (removeButtons.length > 0) {
        console.log('Remove buttons found:', removeButtons.length);
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const watchlistItem = this.closest('.watchlist-item');
                if (watchlistItem) {
                    console.log('Removing watchlist item');
                    // Animate removal
                    watchlistItem.style.opacity = '0';
                    watchlistItem.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        watchlistItem.remove();
                        
                        // Check if watchlist is empty
                        const watchlistGrid = document.querySelector('.watchlist-grid');
                        if (watchlistGrid && watchlistGrid.children.length === 0) {
                            watchlistGrid.innerHTML = '<p class="empty-list">Your watchlist is empty.</p>';
                        }
                    }, 300);
                }
            });
        });
    } else {
        console.log('No remove buttons found on this page');
    }
    
    // Handle connected accounts buttons
    const connectButtons = document.querySelectorAll('.btn-connect, .btn-disconnect');
    if (connectButtons.length > 0) {
        console.log('Connect buttons found:', connectButtons.length);
        
        connectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const accountItem = this.closest('.connected-account');
                if (!accountItem) {
                    console.error('No parent connected-account found');
                    return;
                }
                
                const accountNameEl = accountItem.querySelector('.account-info h5');
                const accountName = accountNameEl ? accountNameEl.textContent : 'Account';
                console.log('Account button clicked:', accountName);
                
                if (accountItem.classList.contains('connected')) {
                    // Disconnect account
                    accountItem.classList.remove('connected');
                    this.textContent = 'Connect';
                    this.classList.remove('btn-disconnect');
                    this.classList.add('btn-connect');
                    
                    const statusEl = accountItem.querySelector('.account-info p');
                    if (statusEl) statusEl.textContent = 'Not Connected';
                    
                    alert(`${accountName} account disconnected successfully.`);
                    
                    // Update localStorage if it's Google
                    if (accountName === 'Google') {
                        updateUserDataProperty('googleConnected', false);
                    }
                } else {
                    // Connect account (in a real app, this would open OAuth flow)
                    accountItem.classList.add('connected');
                    this.textContent = 'Disconnect';
                    this.classList.remove('btn-connect');
                    this.classList.add('btn-disconnect');
                    
                    const statusEl = accountItem.querySelector('.account-info p');
                    if (statusEl) statusEl.textContent = 'Connected';
                    
                    alert(`${accountName} account connected successfully.`);
                    
                    // Update localStorage if it's Google
                    if (accountName === 'Google') {
                        updateUserDataProperty('googleConnected', true);
                    }
                }
            });
        });
    } else {
        console.log('No connect buttons found on this page');
    }
    
    // Edit Profile Page Functionality
    const profileImageUpload = document.getElementById('profile-image-upload');
    const profilePreview = document.getElementById('profile-preview');
    const removePhotoBtn = document.getElementById('remove-photo');
    const editProfileForm = document.getElementById('edit-profile-form');
    
    // Handle profile image upload
    if (profileImageUpload && profilePreview) {
        console.log('Profile image upload functionality initialized');
        
        profileImageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                console.log('File selected:', file.name);
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                    console.log('Image preview updated');
                };
                
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.log('Profile image upload elements not found');
    }
    
    // Handle remove photo button
    if (removePhotoBtn && profilePreview) {
        removePhotoBtn.addEventListener('click', function() {
            console.log('Remove photo button clicked');
            // Set to default avatar
            const nameInput = document.getElementById('edit-name');
            const name = nameInput ? nameInput.value : 'User';
            profilePreview.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
            console.log('Profile image reset to default avatar');
        });
    } else {
        console.log('Remove photo button not found');
    }
    
    // Handle form submission
    if (editProfileForm) {
        console.log('Edit profile form found');
        
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const nameInput = document.getElementById('edit-name');
            const emailInput = document.getElementById('edit-email');
            const bioInput = document.getElementById('edit-bio');
            
            if (!nameInput || !emailInput) {
                console.error('Required form fields not found');
                return;
            }
            
            const name = nameInput.value;
            const email = emailInput.value;
            const bio = bioInput ? bioInput.value : '';
            
            console.log('Form values:', { name, email, bio });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.error('Invalid email format');
                const emailError = document.getElementById('edit-email-error');
                
                if (emailError) {
                    emailError.style.display = 'block';
                    emailInput.parentElement.classList.add('error');
                } else {
                    alert('Please enter a valid email address');
                }
                return;
            }
            
            // Get selected genres
            const selectedGenres = [];
            document.querySelectorAll('input[name="genres"]:checked').forEach(checkbox => {
                selectedGenres.push(checkbox.value);
            });
            
            console.log('Selected genres:', selectedGenres);
            
            // Update user data in localStorage
            const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
            userData.name = name;
            userData.email = email;
            userData.bio = bio;
            userData.favoriteGenres = selectedGenres;
            userData.profileImage = profilePreview.src;
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            console.log('User data updated in localStorage');
            
            console.log('Profile update:', { name, email, bio, genres: selectedGenres });
            
            // Show success message
            alert('Profile updated successfully!');
            
            // Redirect to profile page
            window.location.href = '/user/profile';
        });
    } else {
        console.log('Edit profile form not found');
    }
    
    // Function to update profile page with user data from localStorage
    function updateProfileFromUserData() {
        const storedUserData = localStorage.getItem('currentUser');
        
        if (storedUserData) {
            try {
                const userData = JSON.parse(storedUserData);
                console.log('User data loaded from localStorage:', userData);
                
                // Update profile image if on profile page
                const profileImage = document.querySelector('.profile-image img');
                if (profileImage && userData.profileImage) {
                    profileImage.src = userData.profileImage;
                    profileImage.alt = userData.name || 'User';
                    console.log('Profile image updated');
                }
                
                // Update profile info if on profile page
                const profileName = document.querySelector('.profile-info h2');
                const profileEmail = document.querySelector('.profile-email');
                
                if (profileName && userData.name) {
                    profileName.textContent = userData.name;
                    console.log('Profile name updated');
                }
                
                if (profileEmail && userData.email) {
                    profileEmail.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;
                    console.log('Profile email updated');
                }
                
                // Update other profile elements if they exist
                const lastLogin = document.querySelector('.profile-last-login');
                if (lastLogin && userData.lastLogin) {
                    lastLogin.innerHTML = `<i class="fas fa-clock"></i> Last login: ${userData.lastLogin}`;
                    console.log('Last login updated');
                }
                
                // Update Google connection status
                const googleBadge = document.querySelector('.google-badge');
                if (googleBadge) {
                    if (userData.googleConnected) {
                        googleBadge.style.display = 'inline-flex';
                        console.log('Google badge shown');
                    } else {
                        googleBadge.style.display = 'none';
                        console.log('Google badge hidden');
                    }
                }
                
                // Update account type
                const accountTypeBadge = document.querySelector('.account-type-badge');
                if (accountTypeBadge && userData.accountType) {
                    accountTypeBadge.innerHTML = `<i class="fas fa-crown"></i> ${userData.accountType}`;
                    console.log('Account type badge updated');
                }
                
                // Update edit profile form if on edit page
                const editNameInput = document.getElementById('edit-name');
                const editEmailInput = document.getElementById('edit-email');
                const editBioInput = document.getElementById('edit-bio');
                
                if (editNameInput && userData.name) {
                    editNameInput.value = userData.name;
                    console.log('Edit name input updated');
                }
                
                if (editEmailInput && userData.email) {
                    editEmailInput.value = userData.email;
                    console.log('Edit email input updated');
                }
                
                if (editBioInput && userData.bio) {
                    editBioInput.value = userData.bio;
                    console.log('Edit bio input updated');
                }
                
                // Update genre checkboxes if on edit page
                if (userData.favoriteGenres && userData.favoriteGenres.length > 0) {
                    document.querySelectorAll('input[name="genres"]').forEach(checkbox => {
                        checkbox.checked = userData.favoriteGenres.includes(checkbox.value);
                    });
                    console.log('Genre checkboxes updated');
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        } else {
            console.log('No user data found in localStorage');
        }
    }
    
    // Helper function to update a single property in the user data
    function updateUserDataProperty(property, value) {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        userData[property] = value;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log(`Updated ${property} to ${value} in localStorage`);
    }
}); 