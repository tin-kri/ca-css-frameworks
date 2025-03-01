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

// // Add this at the bottom of the file to verify the module is loaded
// console.log('Auth handlers module loaded');
import { registerUser } from '../../api/auth/register.js'
import { loginUser } from '../../api/auth/login.js'

export function setupAuthHandlers() {
    console.log('Setting up auth handlers...'); // Debug

    setupLoginHandler();
    setupRegisterHandler();
}

function setupLoginHandler() {
    const loginForm = document.querySelector('#login-form');
    console.log('Login form found:', !!loginForm); // Debug

    if (loginForm) {
        console.log('Adding login submit listener'); // Debug
        
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Login form submitted'); // Debug

            try {
                const formData = new FormData(event.target);
                const formFields = Object.fromEntries(formData);
                
                console.log('Login attempt for email:', formFields.email); // Debug
                
                const loginResult = await loginUser(formFields);
                console.log('Login successful:', !!loginResult); // Debug
                
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed: ' + error.message);
            }
        });
    }
}

function setupRegisterHandler() {
    const registerForm = document.querySelector('#register-form');
    console.log('Register form found:', !!registerForm); // Debug

    if (registerForm) {
        console.log('Adding register submit listener'); // Debug
        
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Register form submitted'); // Debug

            try {
                const formData = new FormData(event.target);
                const formFields = Object.fromEntries(formData);
                
                console.log('Registration attempt for:', formFields.email); // Debug
                
                await registerUser(formFields);
                console.log('Registration successful'); // Debug
                
                alert('Registration successful! Please log in.');
                event.target.reset();
                
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed: ' + error.message);
            }
        });
    }
}

// Add this to verify the module is loaded
console.log('Auth handlers module loaded');