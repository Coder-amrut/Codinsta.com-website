/**
 * CodInsta Global Interactivity
 * Handles: Session management, navigation, and global UI components
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSession();
    handleGlobalClicks();
    initSmoothTransitions();
});

/**
 * Enhanced Page Transitions
 */
function initSmoothTransitions() {
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Wait for transition before navigating
            });
        }
    });
}

/**
 * Navigation handling - highlight active link based on URL
 */
function initNavigation() {
    const isPremium = localStorage.getItem('codinsta_premium') === 'true';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    if (isPremium) {
        if (currentPath === 'premium.html') {
            window.location.href = 'premium-hub.html';
            return;
        }
        
        navLinks.forEach(link => {
            if(link.getAttribute('href') === 'premium.html') {
                link.setAttribute('href', 'premium-hub.html');
                link.innerHTML = '<i class="fas fa-crown"></i> Hub';
                link.style.color = '#d97706';
                link.style.fontWeight = '700';
            }
        });
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Extract the filename from the href (e.g., 'index.html#dsa-paths' -> 'index.html')
        const linkFilename = href.split('#')[0];

        // Logical active state
        let isActive = (linkFilename === currentPath);

        // Special Case: DSA Topic page highlights Challenges
        if (currentPath === 'dsa-topic.html' && href.includes('challenges.html')) {
            isActive = true;
        }

        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Enhanced Session Management with Firebase
 */
async function initSession() {
    const user = JSON.parse(localStorage.getItem('codinsta_user'));
    const authBtns = document.querySelector('.auth-btns');

    if (user && authBtns) {
        // If logged in, show profile/logout instead of login/register
        // (Only if not already on login/register pages which might have different headers)
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            authBtns.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 0.9rem; font-weight: 600;">Hi, ${user.username}</span>
                    <button class="btn-login" id="logout-btn" style="padding: 0"><i class="fas fa-sign-out-alt"></i></button>
                    <a href="profile.html"><img src="https://i.pravatar.cc/32?u=${user.username}" style="border-radius: 50%; width: 32px; height: 32px; border: 2px solid var(--primary);"></a>
                </div>
            `;

            document.getElementById('logout-btn')?.addEventListener('click', () => {
                localStorage.removeItem('codinsta_user');
                window.location.href = 'login.html';
            });

            // Sync user data with Firebase if available
            if (window.FirebaseDB && window.FirebaseDB.isInitialized()) {
                const firebaseUser = await window.FirebaseDB.getUser(user.username);
                if (!firebaseUser) {
                    // Save user to Firebase if not exists
                    await window.FirebaseDB.saveUser(user);
                }
            }
        }
    }
}

/**
 * Handle shared button behaviors
 */
function handleGlobalClicks() {
    // Search functionality mock for index.html
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.challenge-card');

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Difficulty filter mock for index.html
    const diffFilter = document.querySelector('.filter-select');
    if (diffFilter) {
        diffFilter.addEventListener('change', (e) => {
            const val = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.challenge-card');

            cards.forEach(card => {
                const badge = card.querySelector('.badge').textContent.toLowerCase();
                if (!val || badge === val) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Notification Helper
 */
window.showToast = function (message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'cheat-warning'; // Reuse existing styles
    toast.style.display = 'block';
    toast.style.background = type === 'success' ? 'var(--success)' : '#1e293b';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

/**
 * Firebase Database Helper Functions
 */
window.FirebaseDB = {
    // Check if Firebase is initialized
    isInitialized: () => {
        return typeof window.firebaseDB !== 'undefined';
    },

    // User Management
    async saveUser(userData) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const userRef = doc(window.firebaseDB, 'users', userData.username);
            await setDoc(userRef, {
                ...userData,
                createdAt: new Date(),
                lastLogin: new Date()
            });
            return true;
        } catch (error) {
            console.error('Error saving user:', error);
            return false;
        }
    },

    async getUser(username) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const userRef = doc(window.firebaseDB, 'users', username);
            const userSnap = await getDoc(userRef);
            return userSnap.exists() ? userSnap.data() : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    // DSA Data Management
    async saveDSAData(topic, data) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const topicRef = doc(window.firebaseDB, 'dsa-topics', topic.replace(/\s+/g, '-').toLowerCase());
            await setDoc(topicRef, {
                ...data,
                lastUpdated: new Date()
            });
            return true;
        } catch (error) {
            console.error('Error saving DSA data:', error);
            return false;
        }
    },

    async getDSAData(topic) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const topicRef = doc(window.firebaseDB, 'dsa-topics', topic.replace(/\s+/g, '-').toLowerCase());
            const topicSnap = await getDoc(topicRef);
            return topicSnap.exists() ? topicSnap.data() : null;
        } catch (error) {
            console.error('Error getting DSA data:', error);
            return null;
        }
    },

    // User Progress
    async saveUserProgress(username, topic, progress) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const progressRef = doc(window.firebaseDB, 'user-progress', `${username}-${topic.replace(/\s+/g, '-').toLowerCase()}`);
            await setDoc(progressRef, {
                username,
                topic,
                ...progress,
                lastUpdated: new Date()
            });
            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    },

    async getUserProgress(username, topic) {
        if (!this.isInitialized()) return null;
        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
            const progressRef = doc(window.firebaseDB, 'user-progress', `${username}-${topic.replace(/\s+/g, '-').toLowerCase()}`);
            const progressSnap = await getDoc(progressRef);
            return progressSnap.exists() ? progressSnap.data() : null;
        } catch (error) {
            console.error('Error getting progress:', error);
            return null;
        }
    }
};
