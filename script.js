// DOM Elements
const dom = {
  loginBtn: document.getElementById('loginBtn'),
  registerBtn: document.getElementById('registerBtn'),
  loginModal: document.getElementById('loginModal'),
  registerModal: document.getElementById('registerModal'),
  applyModal: document.getElementById('applyModal'),
  licenseModal: document.getElementById('licenseModal'),
  searchBtn: document.querySelector('.search-bar button'),
  searchInput: document.querySelector('.search-bar input'),
  applyJobTitle: document.getElementById('applyJobTitle'),
  fileUploads: document.querySelectorAll('.file-upload')
};

// Modal Functions
const modal = {
  open: (modalId) => {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
  },
  
  close: (modalId) => {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
  },
  
  openApply: (jobTitle) => {
    dom.applyJobTitle.textContent = `Apply for ${jobTitle}`;
    modal.open('applyModal');
  },
  
  switchToRegister: () => {
    modal.close('loginModal');
    modal.open('registerModal');
  },
  
  switchToLogin: () => {
    modal.close('registerModal');
    modal.open('loginModal');
  }
};

// Form Handlers
const forms = {
  handleLogin: (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    console.log('Login attempt with:', { email, password });
    alert('Login successful (simulated)');
    modal.close('loginModal');
  },
  
  handleRegister: (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    console.log('Registration attempt with:', { name, email, password });
    alert('Registration successful (simulated)');
    modal.close('registerModal');
  },
  
  handleApplication: (e) => {
    e.preventDefault();
    const name = document.getElementById('applicantName').value;
    const email = document.getElementById('applicantEmail').value;
    const phone = document.getElementById('applicantPhone').value;
    const resume = document.getElementById('applicantResume').files[0];
    
    if (!name || !email || !phone || !resume) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Application submitted for:', dom.applyJobTitle.textContent, { 
      name, email, phone, resume: resume.name 
    });
    alert('Application submitted successfully!');
    modal.close('applyModal');
  }
};

// Search Functionality
const search = {
  performSearch: () => {
    const searchTerm = dom.searchInput.value.trim();
    if (searchTerm) {
      console.log('Searching for:', searchTerm);
      alert(`Search results would show for: ${searchTerm}`);
    } else {
      alert('Please enter a search term');
    }
  }
};

// File Upload Handling
const setupFileUploads = () => {
  dom.fileUploads.forEach(upload => {
    const input = upload.querySelector('input');
    
    upload.addEventListener('click', () => input.click());
    
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        upload.style.borderColor = 'var(--success)';
        upload.querySelector('i').className = 'fas fa-check-circle';
        upload.querySelector('i').style.color = 'var(--success)';
        upload.querySelector('p').textContent = input.files[0].name;
      }
    });
    
    // Drag and drop handlers
    upload.addEventListener('dragover', (e) => {
      e.preventDefault();
      upload.style.borderColor = 'var(--primary)';
    });
    
    upload.addEventListener('dragleave', () => {
      upload.style.borderColor = '#e2e8f0';
    });
    
    upload.addEventListener('drop', (e) => {
      e.preventDefault();
      input.files = e.dataTransfer.files;
      if (input.files.length > 0) {
        upload.style.borderColor = 'var(--success)';
        upload.querySelector('i').className = 'fas fa-check-circle';
        upload.querySelector('i').style.color = 'var(--success)';
        upload.querySelector('p').textContent = input.files[0].name;
      }
    });
  });
};

// Event Listeners
const initEventListeners = () => {
  // Modal triggers
  dom.loginBtn.addEventListener('click', () => modal.open('loginModal'));
  dom.registerBtn.addEventListener('click', () => modal.open('registerModal'));
  
  // Form submissions
  document.querySelector('#loginModal .btn-primary').addEventListener('click', forms.handleLogin);
  document.querySelector('#registerModal .btn-primary').addEventListener('click', forms.handleRegister);
  document.querySelector('#applyModal .btn-primary').addEventListener('click', forms.handleApplication);
  
  // Search functionality
  dom.searchBtn.addEventListener('click', search.performSearch);
  dom.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') search.performSearch();
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.close(e.target.id);
    }
  });
};

// Initialize the application
const init = () => {
  setupFileUploads();
  initEventListeners();
  console.log('DubaiCareerHub initialized');
};

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
