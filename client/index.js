function init() {
  document.getElementsByTagName('table')[0].style.visibility = 'hidden';
}

function saveInfo() {
  var name = document.getElementById('inputName').value;
  var id = document.getElementById('inputId').value;
  var level = document.getElementById('inputYearLevel').value;

  let student = {
    name: name,
    id: id,
    level: level
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/students", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(student));

  if (document.getElementsByTagName('table')[0].style.visibility == 'visible') {
    showStudents();
  }
}

function deleteStudent(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/students/" + id, true);
  xhr.send(null);

  if (document.getElementsByTagName('table')[0].style.visibility == 'visible') {
    showStudents();
  }
}

function showStudents() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;

    if (this.status == 200) {
      var data = JSON.parse(this.responseText);

      if (data.length <= 0) {
        if (document.getElementsByTagName('table')[0].style.visibility == 'visible') {
          document.getElementsByTagName('table')[0].style.visibility = 'hidden';
        }

        return;
      }

      Array.prototype.slice.call(document.getElementsByClassName('studentInfo')).forEach(
        function(elem) {
          elem.remove();
        }
      );

      document.getElementsByTagName('table')[0].style.visibility = 'visible';

      data.forEach(function(student) {
        var node = document.createElement("tr");
        node.className = "studentInfo";

        var id = document.createElement("td");
        var name = document.createElement("td");
        var level = document.createElement("td");
        var action = document.createElement("td");
        var button = document.createElement("button");
        button.appendChild(document.createTextNode("Delete"));

        button.addEventListener("click", function() {
          deleteStudent(student.id);
        });

        action.appendChild(button);
        id.appendChild(document.createTextNode(student.id));
        name.appendChild(document.createTextNode(student.name));
        level.appendChild(document.createTextNode(student.level));

        node.appendChild(id);
        node.appendChild(name);
        node.appendChild(level);
        node.appendChild(action);

        document.getElementById('studentTable').appendChild(node);
      });
    }
  }

  xhr.open("GET", "/students", true);
  xhr.send();
}
