// // import { defineConfig } from 'vite'
// // import { resolve } from 'path'

// export default {
//     root: './src',
//     publicDir: '../public', // Set the public directory
//     build: {
//         outDir: '../dist',
//         emptyOutDir: true,
//         rollupOptions: {
//             input: {
//                 index: '/index.html',
//                 profile: '/profile/index.html',
//                 feed: '/feed/index.html',

//             },
//         },
//     },
// }
// vite.config.js
// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'
//changing  outDir: '../dist' to dist, 
export default defineConfig({
    root: 'src', // Set root to src directory
    base: '/', // Set base URL
    publicDir: '../public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                feed: resolve(__dirname, 'src/feed/index.html'),
                post: resolve(__dirname, 'src/post/index.html'),
                profile: resolve(__dirname, 'src/profile/index.html'),
            },
        },
    },
    server: {
        open: true,
        // Add middleware to handle MIME types
        middlewares: [
            (req, res, next) => {
                if (req.url.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript')
                }
                next()
            },
        ],
    },
})
