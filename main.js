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

function recursif(tree) {
    tree.forEach((item) => {
        if (item.type === 'folder') {
            const folder = document.createElement("div");
            folder.className = "folder-container";
            folder.innerHTML = `<span class="btn-folder"><i class="fa-solid fa-folder" style="color: #d9f76e;"></i> ${item.name}`;
            container.appendChild(folder);

            folder.addEventListener("click", function(event) {
                const selectedFolder = event.target.closest(".btn-folder");
                if (selectedFolder) {
                    recursif(item.children);
                } else return ;
            })
        }
        if (item.type === "file") {
            const file = document.createElement("span");
            file.className = "branch-origin";
            file.innerHTML = `<i class="fa-solid fa-file" style="color: #74C0FC;"></i> ${item.name}`;
            container.appendChild(file)
        }
    })
}

recursif(tree);