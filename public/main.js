const form = document.getElementById('employee-form');
const list = document.getElementById('employee-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const email = form.email.value;

  await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  form.reset();
  loadEmployees();
});

async function loadEmployees() {
  const res = await fetch('/api/employees');
  const employees = await res.json();
  list.innerHTML = '';

  employees.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee';
    div.innerHTML = `
      ${emp.name} - ${emp.email}
      <button onclick="editEmployee('${emp._id}', '${emp.name}', '${emp.email}')">Edit</button>
      <button onclick="deleteEmployee('${emp._id}')">Delete</button>
    `;
    list.appendChild(div);
  });
}

async function deleteEmployee(id) {
  await fetch(`/api/employees/${id}`, { method: 'DELETE' });
  loadEmployees();
}

async function editEmployee(id, oldName, oldEmail) {
  const name = prompt('New name:', oldName);
  const email = prompt('New email:', oldEmail);
  if (name && email) {
    await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    loadEmployees();
  }
}

loadEmployees();
