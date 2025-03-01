// import { registerUser } from '../../api/auth/register.js'
// import { loginUser } from '../../api/auth/login.js'

// export function setupAuthHandlers() {
//     // Register form handler
//     const registerForm = document.querySelector('#register-form')
//     if (registerForm) {
//         registerForm.addEventListener('submit', async (event) => {
//             event.preventDefault()
//             try {
//                 const formData = new FormData(event.target)
//                 const formFields = Object.fromEntries(formData)
//                 await registerUser(formFields)
//                 // Optionally redirect or show success message
//                 alert('Registration successful! Please log in.')
//                 event.target.reset()
//             } catch (error) {
//                 alert('Registration failed: ' + error.message)
//             }
//         })
//     }

//     // Login form handler
//     // 
//     console.log('Setting up auth handlers...'); // Debug: Function called

//     const loginForm = document.querySelector('#login-form');
//     console.log('Login form found:', !!loginForm); // Debug: Form found

//     if (loginForm) {
//         console.log('Adding submit listener to form'); // Debug: Adding listener
        
//         loginForm.addEventListener('submit', async (event) => {
//             event.preventDefault();
//             console.log('Form submitted!'); // Debug: Form submission caught
            
//             try {
//                 const formData = new FormData(event.target);
//                 const email = formData.get('email');
//                 const password = formData.get('password');
//                 console.log('Form data collected:', { email: !!email, password: !!password }); // Debug: Data collected

//                 const formFields = Object.fromEntries(formData);
//                 console.log('Attempting login...'); // Debug: Before API call
                
//                 const result = await loginUser(formFields);
//                 console.log('Login successful, got result:', !!result); // Debug: After API call
                
//             } catch (error) {
//                 console.error('Login failed:', error);
//                 alert('Login failed: ' + error.message);
//             }
//         });

//         // Verify listener was added
//         console.log('Submit listener added successfully');
//     } else {
//         console.warn('Login form not found in the document');
//     }
// }

// src/js/handlers/auth/handlers.js
import { registerUser } from '../../api/auth/register.js'
import { loginUser } from '../../api/auth/login.js'

console.log('Auth handlers module loaded'); // Debug

export function setupAuthHandlers() {
    console.log('Setting up auth handlers...'); // Debug
    setupLoginHandler();
    setupRegisterHandler();
}

function setupLoginHandler() {
    const loginForm = document.querySelector('#login-form');
    console.log('Login form found:', !!loginForm); // Debug

    if (loginForm) {
        // Remove any existing listeners to prevent duplicates
        const newLoginForm = loginForm.cloneNode(true);
        loginForm.parentNode.replaceChild(newLoginForm, loginForm);
        
        console.log('Adding login submit listener'); // Debug
        
        newLoginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            event.stopPropagation(); // Stop event bubbling
            console.log('Login form submitted - default prevented'); // Debug

            const submitButton = event.target.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Signing in...';
            }

            try {
                const formData = new FormData(event.target);
                const formFields = Object.fromEntries(formData);
                
                console.log('Login attempt for:', {
                    email: formFields.email,
                    hasPassword: !!formFields.password
                }); // Debug
                
                const loginResult = await loginUser(formFields);
                console.log('Login API response received:', !!loginResult); // Debug

                if (loginResult) {
                    console.log('Login successful, preparing redirect...'); // Debug
                    // Redirect is handled in loginUser function
                } else {
                    throw new Error('Login failed - no result received');
                }
                
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed: ' + (error.message || 'Please try again'));
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Sign in';
                }
            }
        }, true); // Use capture phase

        // Add form validation
        newLoginForm.addEventListener('input', (event) => {
            const input = event.target;
            if (input.type === 'email') {
                validateEmail(input);
            } else if (input.type === 'password') {
                validatePassword(input);
            }
        });
    } else {
        console.warn('Login form not found in DOM');
    }
}

function setupRegisterHandler() {
    const registerForm = document.querySelector('#register-form');
    console.log('Register form found:', !!registerForm); // Debug

    if (registerForm) {
        // Remove any existing listeners
        const newRegisterForm = registerForm.cloneNode(true);
        registerForm.parentNode.replaceChild(newRegisterForm, registerForm);
        
        console.log('Adding register submit listener'); // Debug
        
        newRegisterForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log('Register form submitted'); // Debug

            const submitButton = event.target.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Creating account...';
            }

            try {
                const formData = new FormData(event.target);
                const formFields = Object.fromEntries(formData);
                
                console.log('Registration attempt for:', {
                    email: formFields.email,
                    hasPassword: !!formFields.password,
                    name: !!formFields.name
                }); // Debug
                
                const result = await registerUser(formFields);
                console.log('Registration successful:', !!result); // Debug
                
                alert('Registration successful! Please log in.');
                event.target.reset();
                
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed: ' + (error.message || 'Please try again'));
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Create account';
                }
            }
        }, true);

        // Add form validation
        newRegisterForm.addEventListener('input', (event) => {
            const input = event.target;
            if (input.type === 'email') {
                validateEmail(input);
            } else if (input.type === 'password') {
                validatePassword(input);
            } else if (input.name === 'name') {
                validateName(input);
            }
        });
    } else {
        console.warn('Register form not found in DOM');
    }
}

// Form validation functions
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    input.setCustomValidity(isValid ? '' : 'Please enter a valid email address');
}

function validatePassword(input) {
    const isValid = input.value.length >= 8;
    input.setCustomValidity(isValid ? '' : 'Password must be at least 8 characters long');
}

function validateName(input) {
    const isValid = input.value.length >= 2;
    input.setCustomValidity(isValid ? '' : 'Name must be at least 2 characters long');
}

// Add this to verify the module is loaded and working
console.log('Auth handlers setup complete');