
const searchInput = document.querySelector('#search');
const searchForm = document.querySelector('form');
const searchButton = document.querySelector('#btn'); // Add this line

// ON FORM SUBMIT ->
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmit();
});

// ON BUTTON CLICK ->
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    formSubmit();
});

// HANDLE THE FORM SUBMIT EVENT ->
const formSubmit = () => {
    const userName = searchInput.value.trim();

    if (userName) {
        console.log(userName);
        getUser(userName);
        searchInput.value = '';
    }
};

// FETCH THE USER FROM GITHUB API USING USERNAME ->
const getUser = async (userName) => {
    try {
        const URL = `https://api.github.com/users/${userName}`;
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`Failed to fetch user data. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        insertDataInHtml(data);

    } catch (error) {
        console.error(error);
    }
};

const insertDataInHtml = (data) => {
    const githubCard = document.querySelector('#github-output-container');
    if (data) {
        // Display the output when data available
        const card = `
            <div class="github-card">
                <div id="left">
                    <img src="${data.avatar_url}" alt="User Avatar" class="avatar">
                </div>
                <div id="right">
                    <div class="user-info">
                        <div class="name">${data.name || data.login}</div>
                        <div class="username">${data.login}</div>
                        <div class="bio">${data.bio || 'No bio available'}</div>
                        <div class="details">
                            <div class="location">Location: ${data.location || 'Not specified'}</div>
                            <div class="company">Company: ${data.company || 'Not specified'}</div>
                            <div class="email">Email: ${data.email || 'Not available'}</div>
                        </div>
                    </div>
                    <div class="stats">
                        <div class="public-gists">Public Gists: ${data.public_gists}</div>
                        <div class="public-repos">Public Repositories: ${data.public_repos}</div>
                        <div class="followers">Followers: ${data.followers}</div>
                        <div class="following">Following: ${data.following}</div>
                    </div>
                </div>
            </div>`;

        githubCard.innerHTML = card;
    } else {
        // Handling the case when data is not available
        githubCard.innerHTML = '<p>No user data available</p>';
    }
}
