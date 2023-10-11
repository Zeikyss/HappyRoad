module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4da6ff',
                    DEFAULT: '#0B84FF',
                    dark: '#0066cc',
                },
                secondary: {
                    light: '#f39e58',
                    DEFAULT: '#ed7410',
                    dark: '#bf5d0d',
                },
                'formulaire': '#99f6e4',
                'errorMessage': '#ef4444',
                'b-g': '#e8eceb',
                'btn-mou': '#e09e50',
                'navfoo': '#8cbdb9',
                'fond': '#2d3e43',
                'fond-clair':'#e2ded8',
                'f-red':'#d1512d'
            },
            backgroundImage: {
                'ContactBG': "url('../../assets/img/bg_contact.jpg')",
                'SignupBG': "url('../../assets/img/bg_signup.jpg')",
                'RoadMap2': "url('../../assets/img/RoadMap2.png')",
                'ConnexionBG': "url('../../assets/img/reservation2.png')",
                'ChatBG': "url('../../assets/img/chat.png')",
            },
            rotate: {
                '36': 'transform: rotate(360deg)',
            },
            height: {
                'map': '680px',
                'cht': '65vh'
            },
            width: {
                'cwt': '70vw',
                'bwt': '20vw'
            }
        },
        fontFamily: {
            'subtitle': ['Roboto'],
            'button': ['Roboto'],
            'text': ['Roboto'],
        }
    },
    plugins: [require('@tailwindcss/forms')],
};
