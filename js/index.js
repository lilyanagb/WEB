var commandForm = document.getElementById('commandForm');
var commandInput = document.getElementById('commandInput');
var commandHistory = document.querySelector('.command-history');
var commandOutput = document.querySelector('.command-output');
var taskFields = document.getElementById('task-fields');
var outputPre = document.getElementById('output-code');
var addTaskButton = document.getElementById('add-task');
var generateTasksButton = document.getElementById('generate-tasks');
var newTaskButton = document.getElementById('new-task');
var contentElement = document.getElementById('task-content');
var currentId = -1;
var emptyTasksInput;
var taskCount = 0;

window.addEventListener('DOMContentLoaded', () => {
  emptyTasksInput = contentElement.innerHTML;

  function createTaskField() {
    
    const taskField = document.createElement('div');
    taskField.innerHTML = `
      <label for="task-label-${taskCount}">Label:</label>
      <input type="text" id="task-label-${taskCount}" name="task-label-${taskCount}" required>
      <label for="task-type-${taskCount}">Type:</label>
      <select type="text" id="task-type-${taskCount}" name="task-type-${taskCount}" required>
        <option value="shell">shell</option>
        <option value="process">process</option>
        <option value="npm">npm</option>
        <option value="grunt">grunt</option>
        <option value="gulp">gulp</option>
        <option value="msbuild">msbuild</option>
        <option value="dotnet">dotnet</option>
        <option value="java">java</option>
        <option value="python">python</option>
        <option value="powershell">powershell</option>
        <option value="go">go</option>
        <option value="docker">docker</option>
        <option value="xcodebuild">xcodebuild</option>
        <option value="clang">clang</option>
        <option value="gcc">gcc</option>
        <option value="tsc">tsc</option>
        <option value="eslint">eslint</option>
        <option value="eslint-disable">eslint-disable</option>
        <option value="eslint-enable">eslint-enable</option>
        <option value="shellTypeScript">shellTypeScript</option>
        <option value="shellCommandTask">shellCommandTask</option>
        <option value="shellTypeScriptAdv">shellTypeScriptAdv</option>
        <option value="shellTypeScriptAdv2">shellTypeScriptAdv2</option>
        <option value="msbuildSonar">msbuildSonar</option>
        <option value="pythonTestExplorer">pythonTestExplorer</option>
        <option value="swift">swift</option>
        <option value="kotlin">kotlin</option>
        <option value="ruby">ruby</option>
        <option value="php">php</option>
        <option value="lua">lua</option>
        <option value="rust">rust</option>
        <option value="shellTypeScriptBuild">shellTypeScriptBuild</option>
        <option value="shellTypeScriptTest">shellTypeScriptTest</option>
        <option value="shellTypeScriptWatch">shellTypeScriptWatch</option>
        <option value="shellTypeScriptServe">shellTypeScriptServe</option>
        <option value="shellTypeScriptLint">shellTypeScriptLint</option>
        <option value="shellTypeScriptFormat">shellTypeScriptFormat</option>
        <option value="shellTypeScriptDebug">shellTypeScriptDebug</option>
        <option value="shellTypeScriptClean">shellTypeScriptClean</option>
        <option value="shellTypeScriptBundle">shellTypeScriptBundle</option>
        <option value="shellTypeScriptPublish">shellTypeScriptPublish</option>
        <option value="shellTypeScriptCustom">shellTypeScriptCustom</option>
      </select>
      <label for="task-command-${taskCount}">Command:</label>
      <input type="text" id="task-command-${taskCount}" name="task-command-${taskCount}" required>
      <hr>
    `;
    taskFields.appendChild(taskField);
    taskCount++;
  }
  function sendCommand(label, command) {
    console.log(label, command);
    if (command !== '' && label !== '') {
      fetch(hostURL + 'internal/process_command.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'command=' + encodeURIComponent(command) + '&label=' + encodeURIComponent(label)
      })
        .then(function(response) {
          console.log(response);
          return response.text();
        })
        .then(function() {
          showHistory();
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
    }
  }
  function generateTasksJson() {
    const tasks = [];
    var primaryLabel = "Unset";
    var primaryLabelSet = false;
    for (let i = 0; i < taskCount; i++) {
      const label = document.getElementById(`task-label-${i}`).value;
      const type = document.getElementById(`task-type-${i}`).value;
      const command = document.getElementById(`task-command-${i}`).value;

      if (label && type && command) {
        if (!primaryLabelSet) {
          primaryLabel = label;
          primaryLabelSet = true;
        }
        const task = {
          label,
          type,
          command,
          problemMatcher: [],
          group: {kind: "build", isDefault:true}
        };
        tasks.push(task);
      }
    }

    if (tasks.length > 0) {
      const json = JSON.stringify({ version: '2.0.0', tasks }, null, 2);
      outputPre.textContent = json;
      
      if(generateTasksButton.innerText == 'Edit tasks.json'){
        editContentById(json);
      }else{
        sendCommand(primaryLabel,json);
      }
    } else {
      outputPre.textContent = 'No tasks defined.';
    }
    hljs.highlightElement(outputPre);
  }
  function refreshFields() {
    contentElement.innerHTML = emptyTasksInput;
    commandForm = document.getElementById('commandForm');
    commandInput = document.getElementById('commandInput');
    commandHistory = document.querySelector('.command-history');
    commandOutput = document.querySelector('.command-output');
    taskFields = document.getElementById('task-fields');
    outputPre = document.getElementById('output-code');
    addTaskButton = document.getElementById('add-task');
    generateTasksButton = document.getElementById('generate-tasks');
    generateTasksButton.innerText = 'Generate tasks.json';
    newTaskButton = document.getElementById('new-task');
    contentElement = document.getElementById('task-content');
    taskCount = 0;
    addTaskButton.addEventListener('click', createTaskField);
    generateTasksButton.addEventListener('click', generateTasksJson);
  }
  addTaskButton.addEventListener('click', createTaskField);
  generateTasksButton.addEventListener('click', generateTasksJson);
  newTaskButton.addEventListener('click', refreshFields);
});

function loadExample(id) {
  taskFields.innerHTML = '';
  if (addTaskButton) {
    addTaskButton.remove();
  }
  if (generateTasksButton) {
    generateTasksButton.remove();
  }
  var jsonExample;
  switch (id) {
    case 0:
      jsonExample = JSON.parse(`{
        "version": "2.0.0",
        "tasks": [
          {
            "label": "Docker Run",
            "type": "shell",
            "command": "docker run --rm -it my-docker-image",
            "group": {
              "kind": "build",
              "isDefault": true
            }
          }
        ]
      }`);
      break;
    case 1: 
      jsonExample = JSON.parse(`{
        "version": "2.0.0",
        "tasks": [
          {
            "label": "PHP Server",
            "type": "shell",
            "command": "php -S localhost:8000",
          "group": {
              "kind": "build",
              "isDefault": true
            }
          }
        ]
      }`);
      break;
    case 2:
      jsonExample = JSON.parse('{ \
        "version": "2.0.0",\
        "tasks": [\
          {\
            "label": "C++ Build",\
            "type": "shell",\
            "command": "g++ -o ${fileDirname}/${fileBasenameNoExtension} ${file}",\
            "group": {\
              "kind": "build",\
              "isDefault": true\
            }\
          }\
        ]\
      }');
      break;
    case 3:
      jsonExample = JSON.parse(`{
        "version": "2.0.0",
        "tasks": [
          {
            "label": "Git Push",
            "type": "shell",
            "command": "git push",
          "group": {
              "kind": "build",
              "isDefault": true
            }
          }
        ]
      }`);
      break;
    default:
      break;
  }
  outputPre.textContent = JSON.stringify(jsonExample, null, 2);
  hljs.highlightElement(outputPre);

}

function editContentById(newValue) {
  if (currentId == -1) {
    return;
  }
  fetch(hostURL + 'internal/edit_command.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'id=' + encodeURIComponent(currentId) + '&value=' + encodeURIComponent(newValue),
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    console.log(data, currentId);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function removeCommand(id) {
  fetch(hostURL + 'internal/remove_command.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'id=' + encodeURIComponent(id)
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    console.log(data, id);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

function showCommandOutput(id) {
  taskCount = 0;
  taskFields.innerHTML = '';
  currentId = id;
  generateTasksButton.innerText = 'Edit tasks.json';
  fetch(hostURL + 'internal/load_command.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'id=' + encodeURIComponent(id)
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    // Показване на резултата в интерфейса
    console.log(data, id);
    var raw_commands = JSON.parse(data); 
    console.log(raw_commands[0]["Value"]);
    var commands = JSON.parse(raw_commands[0]["Value"]); 
    
    taskCount = 0;
    commands["tasks"].forEach(function(entry) {
      const taskField = document.createElement('div');
      const taskTypes = [
        'shell',
        'process',
        'npm',
        'grunt',
        'gulp',
        'msbuild',
        'dotnet',
        'java',
        'python',
        'powershell',
        'go',
        'docker',
        'xcodebuild',
        'clang',
        'gcc',
        'tsc',
        'eslint',
        'eslint-disable',
        'eslint-enable',
        'shellTypeScript',
        'shellCommandTask',
        'shellTypeScriptAdv',
        'shellTypeScriptAdv2',
        'msbuildSonar',
        'pythonTestExplorer',
        'swift',
        'kotlin',
        'ruby',
        'php',
        'lua',
        'rust',
        'shellTypeScriptBuild',
        'shellTypeScriptTest',
        'shellTypeScriptWatch',
        'shellTypeScriptServe',
        'shellTypeScriptLint',
        'shellTypeScriptFormat',
        'shellTypeScriptDebug',
        'shellTypeScriptClean',
        'shellTypeScriptBundle',
        'shellTypeScriptPublish',
        'shellTypeScriptCustom'
      ];
      
      const selectElement = document.createElement('select');
      selectElement.id = `task-type-${taskCount}`;
      selectElement.name = `task-type-${taskCount}`;
      selectElement.required = true;
      
      taskTypes.forEach(type => {
        const optionElement = document.createElement('option');
        optionElement.value = type;
        optionElement.textContent = type;
        if (type === entry['type']) {
          optionElement.setAttribute("selected", "selected");
        }
        selectElement.appendChild(optionElement);
      });
      selectElement.innerHTML;
      taskField.innerHTML = `
        <label for="task-label-${taskCount}">Label:</label>
        <input type="text" id="task-label-${taskCount}" name="task-label-${taskCount}" value="${entry['label']}" required>
        <label for="task-type-${taskCount}">Type:</label>
        ${selectElement.outerHTML}
        <label for="task-command-${taskCount}">Command:</label>
        <input type="text" id="task-command-${taskCount}" name="task-command-${taskCount}" value="${entry['command']}" required >
        <hr>
      `;
      taskCount ++;
      taskFields.appendChild(taskField);
    });
    // taskCount=0;
     const formattedJson = JSON.stringify(commands, null, 2);

    outputPre.textContent = formattedJson;
    hljs.highlightElement(outputPre);
    
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

function showHistory() {
  commandHistory.innerHTML = '';
  fetch(hostURL + 'internal/load_command.php')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.text(); 
    })
    .then(function(data) {
      var commands = JSON.parse(data);
      commands.forEach(function(command) {
        var commandItem = document.createElement('li');
        commandItem.textContent = JSON.stringify(command['Title']).slice(1, -1);
        commandItem.addEventListener('click', function() {
          showCommandOutput(JSON.stringify(command['ID']));
        });
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function(event) {
          event.stopPropagation(); 
          removeCommand(JSON.stringify(command['ID']));
          commandItem.remove();
        });
      
        commandItem.appendChild(deleteButton);
        commandHistory.appendChild(commandItem);
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
  });
}

showHistory();