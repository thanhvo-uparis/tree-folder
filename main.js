const tree = [
  // === ROOT FILES ===
  { type: 'file', name: 'index.html' },
  { type: 'file', name: 'style.css' },
  { type: 'file', name: 'app.js' },
  { type: 'file', name: 'setup.sql' },

  // === ROOT FOLDERS ===
  {
    type: 'folder',
    name: 'src',
    children: [
      {
        type: 'folder',
        name: 'components',
        children: [
          { type: 'file', name: 'Navbar.js' },
          { type: 'file', name: 'Footer.js' },
          { type: 'file', name: 'Sidebar.js' }
        ]
      },
      {
        type: 'folder',
        name: 'pages',
        children: [
          { type: 'file', name: 'Home.js' },
          { type: 'file', name: 'About.js' }
        ]
      },
      { type: 'file', name: 'App.js' },
      { type: 'file', name: 'main.js' }
    ]
  },
  {
    type: 'folder',
    name: 'assets',
    children: [
      {
        type: 'folder',
        name: 'images',
        children: [
          { type: 'file', name: 'logo.png' },
          { type: 'file', name: 'banner.jpg' }
        ]
      },
      {
        type: 'folder',
        name: 'icons',
        children: [
          { type: 'file', name: 'home.svg' },
          { type: 'file', name: 'user.svg' }
        ]
      },
      { type: 'file', name: 'favicon.ico' }
    ]
  },
  {
    type: 'folder',
    name: 'styles',
    children: [
      { type: 'file', name: 'reset.css' },
      { type: 'file', name: 'global.css' },
      { type: 'file', name: 'responsive.css' }
    ]
  },
  {
    type: 'folder',
    name: 'config',
    children: [
      { type: 'file', name: 'env.local' },
      { type: 'file', name: 'env.prod' },
      { type: 'file', name: 'config.js' }
    ]
  },
  {
    type: 'folder',
    name: 'database',
    children: [
      {
        type: 'folder',
        name: 'migrations',
        children: [
          { type: 'file', name: '001_init.sql' },
          { type: 'file', name: '002_add_users.sql' }
        ]
      },
      { type: 'file', name: 'schema.sql' },
      { type: 'file', name: 'seed.sql' }
    ]
  },
  {
    type: 'folder',
    name: 'public',
    children: [
      { type: 'file', name: 'robots.txt' },
      { type: 'file', name: 'manifest.json' }
    ]
  },
  {
    type: 'folder',
    name: 'tests',
    children: [
      {
        type: 'folder',
        name: 'unit',
        children: [
          { type: 'file', name: 'App.test.js' },
          { type: 'file', name: 'Navbar.test.js' }
        ]
      },
      {
        type: 'folder',
        name: 'integration',
        children: [
          { type: 'file', name: 'LoginFlow.test.js' }
        ]
      }
    ]
  },
  {
    type: 'folder',
    name: 'docs',
    children: [
      { type: 'file', name: 'README.md' },
      { type: 'file', name: 'CONTRIBUTING.md' },
      { type: 'file', name: 'LICENSE' }
    ]
  },
  {
    type: 'folder',
    name: 'scripts',
    children: [
      { type: 'file', name: 'build.sh' },
      { type: 'file', name: 'deploy.sh' }
    ]
  },
  {
    type: 'folder',
    name: 'archive',
    children: [] // thư mục trống
  }
];

const container = document.querySelector("#tree-container");
const contextMenu = document.querySelector(".context-menu");
const inputEdit = "";

//show context menu
container.oncontextmenu = (event) => {
  event.preventDefault();
  contextMenu.style.display = "block";

  Object.assign(contextMenu.style, {
    top: event.clientY + 'px',
    left: event.clientX + 'px'
  })
}
// hidden context menu
container.addEventListener("mousedown", function(event) {
    if (event.button === 0) {
      contextMenu.style.display = "none";
    } 
})

function recursif(tree, parentContainer) {
    tree.forEach((item) => {
      const folder = document.createElement("div");
      let currentValue = "";
      //add input
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentValue;
      const handleRename = function(nameElement, headerElement, event) {
                if (event.button = 2) {
                  currentValue = item.name;
                  input.value = currentValue;
                  //action de rename folder
                  contextMenu.addEventListener("click", function(event) {
                  const btnRename = event.target.closest("#btn-rename");
                  const btnDelete = event.target.closest("#btn-delete");
                  
                  if (btnRename) {
                    nameElement.textContent = "";
                    headerElement.appendChild(input);
                    input.focus();
                    contextMenu.style.display = "none";
                    //blur
                    input.addEventListener("blur", (event) => {
                      item.name = input.value.trim();
                      nameElement.textContent = item.name;
                      headerElement.removeChild(input);
                    })
                    input.addEventListener("keydown", (event) => {
                      if (event.key === "Enter") {
                          input.blur();
                        }
                    })
                  }
                  if (btnDelete) {
                    console.log("da an vao nut delete");
                  }
                })
              }
            }
      if (item.type === 'folder') {
          let isOpen = false;
          let isRendered = false;

          const folderHeader = document.createElement("div");
          folderHeader.className = "folder-header";
          const iconFolder = document.createElement("i");
          iconFolder.className = "fa-solid fa-greater-than";
          iconFolder.style.color = "rgb(84 196 240)";
          const folderName = document.createElement("span");
          folderName.className = "folder-name";
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

          folderHeader.onmousedown = (event) => {
              handleRename(folderName, folderHeader, event);
          }     
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

            file.onmousedown = (event) => {
              handleRename(fileName, file, event);
          }  
            
        }
    })
}

recursif(tree, container);