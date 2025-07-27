const tree = [
  {
    type: 'folder',
    name: 'src',
    children: [
      {
        type: 'folder',
        name: 'components',
        children: [
          { type: 'file', name: 'Header.js' },
          { type: 'file', name: 'Footer.js' }
        ]
      },
      { type: 'file', name: 'index.js' }
    ]
  },
  { type: 'file', name: 'README.md' }
];

const container = document.querySelector("#tree-container");

function recursif(tree, parentContainer) {
    tree.forEach((item) => {
      const folder = document.createElement("div");
        if (item.type === 'folder') {
            let isOpen = false;
            let isRendered = false;

            const folderHeader = document.createElement("div");
            folderHeader.className = "folder-header";
            const iconFolder = document.createElement("i");
            iconFolder.className = "fa-solid fa-greater-than";
            iconFolder.style.color = "rgb(84 196 240)";
            const folderName = document.createElement("span");
            folderName.textContent = item.name;
            folderHeader.appendChild(iconFolder);
            folderHeader.appendChild(folderName);

            const folderChildren = document.createElement("div");
            folderChildren.className = "folder-children";
            folderChildren.style.display = "none";

            folderHeader.addEventListener("click", function(event) {
                event.stopPropagation();
                if (item.children) {
                    isOpen = !isOpen;
                    isOpen ? iconFolder.className = "fa-solid fa-v" : iconFolder.className = "fa-solid fa-greater-than";
                    folderChildren.style.display = isOpen ? "block" : "none";
                    if (isOpen && !isRendered) {
                        recursif(item.children, folderChildren);
                        isRendered = true;
                    }
                }
            })
            folder.appendChild(folderHeader);
            folder.appendChild(folderChildren);
            parentContainer.appendChild(folder);
        }
        if (item.type === "file") {
            const file = document.createElement("div");
            file.className = "file-type";
            const fileName = document.createElement("span");
            fileName.textContent = item.name;
            const iconFile = document.createElement("i");
            if (item.name.endsWith(".js")) {
              iconFile.className = "fa-brands fa-square-js"
              iconFile.style.color = "#FFD43B";
              fileName.style.color = "#FFD43B";
            } else {
              iconFile.className = "fa-solid fa-file";
              iconFile.style.color = "#74C0FC";
            }
            file.appendChild(iconFile);
            file.appendChild(fileName);
            parentContainer.appendChild(file)
        }
    })
}

recursif(tree, container);