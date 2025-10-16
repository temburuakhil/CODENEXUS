let sentimentHistory = [];
const MAX_HISTORY_POINTS = 10;
const UPDATE_INTERVAL = 300000; // Update every 5 minutes

// Mock data for development/demo
const MOCK_NEWS = [
    {
        title: "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control",
        description: "The Reserve Bank of India's Monetary Policy Committee keeps the repo rate unchanged at 6.5% for the sixth consecutive time, prioritizing inflation management while maintaining growth momentum.",
        url: "https://example.com/rbi-policy",
        publishedAt: new Date(),
        source: { name: "MoneyControl" },
        sourceName: "moneycontrol"
    },
    {
        title: "Government Announces New FDI Policy Framework",
        description: "Finance Ministry unveils revised FDI policy to boost manufacturing sector, allowing 100% foreign investment in critical sectors under automatic route.",
        url: "https://example.com/fdi-policy",
        publishedAt: new Date(Date.now() - 3600000),
        source: { name: "Economic Times" },
        sourceName: "economictimes"
    },
    {
        title: "Budget 2024: Infrastructure Gets Major Boost",
        description: "Union Budget 2024 allocates ₹10 lakh crore for infrastructure development, focusing on roads, railways, and digital infrastructure.",
        url: "https://example.com/budget-infra",
        publishedAt: new Date(Date.now() - 7200000),
        source: { name: "Business Standard" },
        sourceName: "businessstandard"
    },
    {
        title: "GST Collections Hit Record High in March",
        description: "Monthly GST collections cross ₹1.50 lakh crore mark, indicating strong economic recovery and improved compliance.",
        url: "https://example.com/gst-collections",
        publishedAt: new Date(Date.now() - 10800000),
        source: { name: "LiveMint" },
        sourceName: "livemint"
    }
];

// Initialize charts immediately with loading state
function initializeChartsWithLoading() {
    // Initialize sentiment distribution chart
    const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
    window.sentimentChart = new Chart(sentimentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#4caf50', '#9e9e9e', '#f44336'],
                borderWidth: 1,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Current Sentiment Distribution',
                    font: {
                        size: 16
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Initialize sentiment trends chart
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    window.trendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Positive',
                data: [],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Neutral',
                data: [],
                borderColor: '#9e9e9e',
                backgroundColor: 'rgba(158, 158, 158, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Negative',
                data: [],
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Sentiment Trends Over Time',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Articles'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });

    // Initialize source distribution chart
    const sourcesCtx = document.getElementById('sourcesChart').getContext('2d');
    window.sourcesChart = new Chart(sourcesCtx, {
        type: 'bar',
        data: {
            labels: ['MoneyControl', 'Economic Times', 'Business Standard', 'LiveMint'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: ['#1565c0', '#c2185b', '#7b1fa2', '#2e7d32'],
                borderWidth: 1,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'News Source Distribution',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Articles'
                    }
                }
            }
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeChartsWithLoading();
    fetchAndUpdateDashboard();
    // Set up periodic updates
    setInterval(fetchAndUpdateDashboard, UPDATE_INTERVAL);
});

async function fetchFinancialNews() {
    try {
        const response = await fetch('latest_news.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let allNews = await response.json();

        if (!Array.isArray(allNews) || allNews.length === 0) {
            throw new Error('No news available');
        }

        // Sort news by date
        allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        
        return allNews;
    } catch (error) {
        console.error('Error fetching news:', error);
        displayError(`Failed to fetch news: ${error.message}. Retrying in 5 minutes...`);
        return null;
    }
}

function displayError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
        <div class="alert alert-warning">
            <p>${message}</p>
            <button onclick="fetchAndUpdateDashboard()" class="refresh-button">
                Refresh Now
            </button>
        </div>
    `;
    
    const newsContainer = document.getElementById('news-feed');
    if (newsContainer) {
        newsContainer.innerHTML = '';
        newsContainer.appendChild(errorContainer);
    }
}

function processNewsData(articles, sourceName) {
    return articles.map(article => ({
        title: article.title || 'No Title',
        description: article.description || 'No description available',
        url: article.url,
        publishedAt: new Date(article.publishedAt),
        source: article.source.name,
        sourceName: sourceName,
        sentiment: analyzeSentiment((article.title || '') + ' ' + (article.description || ''))
    }));
}

function analyzeSentiment(text) {
    // Enhanced sentiment analysis with financial keywords
    const positiveWords = [
        'growth', 'increase', 'boost', 'positive', 'surplus', 'reform', 'improve',
        'upward', 'gain', 'profit', 'recovery', 'bullish', 'expansion', 'outperform',
        'upgrade', 'strong', 'success', 'advantage', 'opportunity', 'breakthrough'
    ];
    
    const negativeWords = [
        'decline', 'decrease', 'deficit', 'crisis', 'concern', 'risk', 'fall',
        'downward', 'loss', 'bearish', 'recession', 'downturn', 'underperform',
        'downgrade', 'weak', 'failure', 'disadvantage', 'threat', 'breakdown'
    ];
    
    try {
        if (!text) return { score: 0, label: 'Neutral' };
        
        let score = 0;
        const words = text.toLowerCase().split(/\s+/);
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score++;
            if (negativeWords.includes(word)) score--;
        });
        
        return {
            score: score,
            label: score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'
        };
    } catch (error) {
        console.error('Error in sentiment analysis:', error);
        return { score: 0, label: 'Neutral' };
    }
}

async function fetchAndUpdateDashboard() {
    try {
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'loading-message';
        loadingMessage.textContent = 'Fetching latest financial news...';
        
        const newsContainer = document.getElementById('news-feed');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(loadingMessage);
        }

        const news = await fetchFinancialNews();
        if (!news) {
            return; // Error already handled in fetchFinancialNews
        }

        // Use the sentiment analysis from FinBERT that's already in the news data
        updateNewsFeed(news);
        updateSentimentStats(news);
        updateCharts(news);

    } catch (error) {
        console.error('Error updating dashboard:', error);
        displayError('Failed to update dashboard. Will retry automatically.');
    }
}

function updateSentimentStats(news) {
    const stats = news.reduce((acc, item) => {
        if (item.sentiment && item.sentiment.label) {
            const label = item.sentiment.label.charAt(0).toUpperCase() + item.sentiment.label.slice(1);
            acc[label] = (acc[label] || 0) + 1;
        }
        return acc;
    }, { Positive: 0, Negative: 0, Neutral: 0 });

    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    
    // Update sentiment distribution chart
    if (window.sentimentChart) {
        window.sentimentChart.data.datasets[0].data = [
            stats.Positive,
            stats.Neutral,
            stats.Negative
        ];
        window.sentimentChart.update();
    }

    // Update sentiment history
    const currentDate = new Date().toISOString().split('T')[0];
    sentimentHistory.push({
        date: currentDate,
        positive: stats.Positive,
        neutral: stats.Neutral,
        negative: stats.Negative
    });

    // Keep only last MAX_HISTORY_POINTS points
    if (sentimentHistory.length > MAX_HISTORY_POINTS) {
        sentimentHistory = sentimentHistory.slice(-MAX_HISTORY_POINTS);
    }

    // Update trends chart
    if (window.trendsChart) {
        window.trendsChart.data.labels = sentimentHistory.map(item => item.date);
        window.trendsChart.data.datasets[0].data = sentimentHistory.map(item => item.positive);
        window.trendsChart.data.datasets[1].data = sentimentHistory.map(item => item.neutral);
        window.trendsChart.data.datasets[2].data = sentimentHistory.map(item => item.negative);
        window.trendsChart.update();
    }
}

function updateCharts(news) {
    // Update source distribution
    const sourceStats = news.reduce((acc, item) => {
        const sourceName = item.sourceName.toLowerCase();
        acc[sourceName] = (acc[sourceName] || 0) + 1;
        return acc;
    }, {});

    if (window.sourcesChart) {
        window.sourcesChart.data.labels = Object.keys(sourceStats)
            .map(name => name.charAt(0).toUpperCase() + name.slice(1));
        window.sourcesChart.data.datasets[0].data = Object.values(sourceStats);
        window.sourcesChart.update();
    }
}

function updateNewsFeed(news) {
    const newsContainer = document.getElementById('news-feed');
    newsContainer.innerHTML = '';

    news.forEach(article => {
        const newsItem = document.createElement('div');
        const sentimentClass = article.sentiment.label.toLowerCase();
        newsItem.className = `news-item ${sentimentClass}`;

        const sourceTag = document.createElement('span');
        sourceTag.className = `source-tag source-${article.sourceName.toLowerCase()}`;
        sourceTag.textContent = article.source.name;

        const sentimentBadge = document.createElement('span');
        sentimentBadge.className = 'sentiment-badge';
        sentimentBadge.textContent = `${article.sentiment.label} (${(article.sentiment.score * 100).toFixed(1)}%)`;

        const newsHeader = document.createElement('div');
        newsHeader.className = 'news-header';
        newsHeader.appendChild(sourceTag);
        newsHeader.appendChild(sentimentBadge);

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        const date = document.createElement('div');
        date.className = 'news-date';
        date.textContent = new Date(article.publishedAt).toLocaleString();

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read More';

        newsItem.appendChild(newsHeader);
        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(date);
        newsItem.appendChild(link);

        newsContainer.appendChild(newsItem);
    });
}

// Initialize dashboard and set update interval
fetchAndUpdateDashboard();
setInterval(fetchAndUpdateDashboard, UPDATE_INTERVAL); // Update every 5 minutes 