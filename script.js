document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slideshow-pic');
    const totalSlides = slides.length;
    if (totalSlides > 0) {
        slides[slideIndex].classList.add('active');
        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % totalSlides;
            slides[slideIndex].classList.add('active');
        }, 10000);
    }
    document.querySelector('.left-arrow')?.addEventListener('click', () => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        slides[slideIndex].classList.add('active');
    });
    document.querySelector('.right-arrow')?.addEventListener('click', () => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % totalSlides;
        slides[slideIndex].classList.add('active');
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        let objectType = target.tagName.toLowerCase();
        if (target.tagName === 'IMG') objectType = 'image';
        else if (target.tagName === 'P') objectType = 'text';
        else if (target.tagName === 'A') objectType = 'link';
        else if (target.tagName === 'BUTTON') objectType = target.classList.contains('arrow') ? 'arrow' : 'button';
        else if (target.classList.contains('skill-level')) objectType = 'skill-bar';
        else if (target.tagName === 'LI' && target.parentElement.parentElement.id === 'achievements') objectType = 'achievement';
        logEvent('click', objectType, target);
    });
    document.body.addEventListener('click', (event) => {
        if (event.target === document.body) {
            document.body.classList.toggle('solid-bg');
        }
    });
    logEvent('view', 'page', `Page loaded: ${window.location.pathname}`);
    if (window.location.pathname.includes('analyzer.html')) {
        const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
        const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'to', 'from', 'of', 'about'];
        const articles = ['a', 'an'];
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            const text = document.getElementById('textInput').value;
            const resultsDiv = document.getElementById('analysisResults');
            resultsDiv.innerHTML = '';
            const letters = (text.match(/[a-zA-Z]/g) || []).length;
            const words = (text.match(/\S+/g) || []).length;
            const spaces = (text.match(/\s/g) || []).length;
            const newlines = (text.match(/\n/g) || []).length;
            const symbols = (text.match(/[^\w\s]/g) || []).length;
            resultsDiv.innerHTML += `
                <h3>Basic Counts</h3>
                <p>Letters: ${letters}</p>
                <p>Words: ${words}</p>
                <p>Spaces: ${spaces}</p>
                <p>Newlines: ${newlines}</p>
                <p>Special Symbols: ${symbols}</p>
            `;
            const pronounCounts = countWords(text, pronouns);
            resultsDiv.innerHTML += `
                <h3>Pronouns</h3>
                <ul>${Object.entries(pronounCounts).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}</ul>
            `;
            const prepositionCounts = countWords(text, prepositions);
            resultsDiv.innerHTML += `
                <h3>Prepositions</h3>
                <ul>${Object.entries(prepositionCounts).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}</ul>
            `;
            const articleCounts = countWords(text, articles);
            resultsDiv.innerHTML += `
                <h3>Indefinite Articles</h3>
                <ul>${Object.entries(articleCounts).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}</ul>
            `;
        });
        function countWords(text, wordList) {
            const counts = {};
            wordList.forEach(word => counts[word] = 0);
            const words = text.toLowerCase().match(/\b\w+\b/g) || [];
            words.forEach(word => {
                if (wordList.includes(word)) {
                    counts[word]++;
                }
            });
            return counts;
        }
    }
    function logEvent(type, object, details) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${type}, ${object}`);
    }
});