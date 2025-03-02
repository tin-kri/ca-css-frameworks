// import { API_AUTH_LOGIN } from '../../utils/constants.js'
// import { addToLocalStorage } from '../../utils/storage.js'

// export async function loginUser(userDetails) {
//     try {
//         const fetchOptions = {
//             method: 'POST',
//             body: JSON.stringify(userDetails),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }
//         const response = await fetch(API_AUTH_LOGIN, fetchOptions)
//         const json = await response.json()
        
//        // src/js/api/auth/login.js
// if (response.ok) {
//     const accessToken = json.data.accessToken
//     addToLocalStorage('accessToken', accessToken)
    
//     // Add debug logging
//     console.log('Login successful, token stored:', !!accessToken)
    
//     // Update the redirect path
//     window.location.href = '/feed/'  // or '/feed/index.html'
//     return json.data

//         } else {
//             throw new Error(json.message || 'Failed to login')
//         }
//     } catch (error) {
//         console.log('Login error:', error)
//         throw error // Re-throw to handle in the form handler
//     }
// }

// src/js/api/auth/login.js
// export async function loginUser(userDetails) {
//     try {
//         console.log('Attempting login...'); // Debug log
        
//         const fetchOptions = {
//             method: 'POST',
//             body: JSON.stringify(userDetails),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }
        
//         const response = await fetch(API_AUTH_LOGIN, fetchOptions)
//         const json = await response.json()
        
//         console.log('Login response:', json); // Debug log
        
//         if (response.ok) {
//             const accessToken = json.data.accessToken
//             console.log('Got token:', !!accessToken); // Debug log
            
//             // Store token
//             localStorage.setItem('accessToken', accessToken)
            
//             // Verify token was stored
//             const storedToken = localStorage.getItem('accessToken')
//             console.log('Token stored:', !!storedToken); // Debug log
            
//             // Use window.location.href instead of replace
//             window.location.href = '/feed/'
//             return json.data
//         } else {
//             throw new Error(json.message || 'Failed to login')
//         }
//     } catch (error) {
//         console.error('Login error:', error)
//         throw error
//     }
// }

// src/js/api/auth/login.js
import { API_AUTH_LOGIN } from '../../utils/constants.js'
import { addToLocalStorage, getFromLocalStorage } from '../../utils/storage.js'

export async function loginUser(userDetails) {
    console.log('Login attempt started for:', userDetails.email); // Debug

    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Debug API call
        console.log('Sending request to:', API_AUTH_LOGIN);
        
        const response = await fetch(API_AUTH_LOGIN, fetchOptions);
        const json = await response.json();
        
        console.log('Response received:', {
            status: response.status,
            ok: response.ok
        });

        if (response.ok) {
            const accessToken = json.data.accessToken;
            
            // Store token
            addToLocalStorage('accessToken', accessToken);
            
            // Verify storage
            const storedToken = getFromLocalStorage('accessToken');
            console.log('Token stored successfully:', !!storedToken);

            // Redirect
            console.log('Redirecting to feed...');
            window.location.href = '/feed/';
            
            return json.data;
        } else {
            throw new Error(json.message || 'Failed to login');
        }
    } catch (error) {
        console.log('Login error:', error);
        throw error; // Re-throw to handle in the form handler
    }
}