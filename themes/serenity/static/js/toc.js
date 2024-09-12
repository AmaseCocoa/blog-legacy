document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById("TableOfContents");
    const headers = document.querySelectorAll(".content h1, .content h2, .content h3, .content h4, .content h5, .content h6");
    const tocList = document.createElement("ul");
    let currentList = tocList;
    let currentLevel = 1;

    headers.forEach(header => {
      const id = header.id || header.textContent.replace(/\s+/g, '-').toLowerCase();
      header.id = id;

      const level = parseInt(header.tagName[1]);
      const tocItem = document.createElement("li");
      tocItem.classList.add(`toc-${header.tagName.toLowerCase()}`);

      const tocLink = document.createElement("a");
      tocLink.href = `#${id}`;
      tocLink.textContent = header.textContent;

      tocItem.appendChild(tocLink);

      if (level > currentLevel) {
        const newList = document.createElement("ul");
        if (currentList.lastElementChild) {
          currentList.lastElementChild.appendChild(newList);
          currentList = newList;
        }
      } else if (level < currentLevel) {
        for (let i = currentLevel; i > level; i--) {
          if (currentList.parentElement) currentList = currentList.parentElement;
        }
      }

      currentList.appendChild(tocItem);
      currentLevel = level;
    });

    toc.appendChild(tocList);
  });