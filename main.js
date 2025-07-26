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
            const folderHeader = document.createElement("div");
            folderHeader.className = "folder-header";
            folderHeader.innerHTML = `<i class="fa-solid fa-folder" style="color: #d9f76e;"></i> ${item.name}`;
            
            const folderChildren = document.createElement("div");
            folderChildren.className = "folder-children";
            folderChildren.style.display = "none";

            folderHeader.addEventListener("click", function(event) {
                event.stopPropagation();
                if (item.children) {
                    folderChildren.style.display = "none" ? "block" : "none";
                    recursif(item.children, folderChildren);
                }
            })
            folder.appendChild(folderHeader);
            folder.appendChild(folderChildren);
            parentContainer.appendChild(folder);
        }
        if (item.type === "file") {
            const file = document.createElement("div");
            file.className = "file-type";
            file.innerHTML = `<i class="fa-solid fa-file" style="color: #74C0FC;"></i> ${item.name}`;
            parentContainer.appendChild(file)
        }
    })
}

recursif(tree, container);