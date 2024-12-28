const accesskey = "Su-utee_bO_YvbAKFYmPX80HsXrkaWfc5hTEl9K6a9o";

const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");
const searchresult = document.getElementById("search-result");
const showmore = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchimages() {
    keyword = searchbox.value.trim(); 
    if (!keyword) {
        alert("Please enter a keyword to search!");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=24`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (page === 1) {
            searchresult.innerHTML = ""; 
        }

        const results = data.results;

        if (results.length === 0 && page === 1) {
            searchresult.innerHTML = "<p>No results found. Try another keyword!</p>";
            showmore.style.display = "none";
            return;
        }

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image from Unsplash";

            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.appendChild(image);

            searchresult.appendChild(imagelink);
        });

        showmore.style.display = "block" ;
        credit.style.display = "block";

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong while fetching images.");
    }
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; 
    searchimages();
});

showmore.addEventListener("click", () => {
    page++;
    searchimages();
});
