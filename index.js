const express = require("express");
const app = express();

// Hardcoded contacts data
let contacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Route handler for "/api/contacts"
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/api/info", (req, res) => {
  const numContacts = contacts.length;
  const appName = "Contacts Web Server";

  const response = `<h1>${appName}</h1>
    <p>Number of contacts: ${numContacts}</p>`;

  res.send(response);
});

app.get("/api/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

app.delete("/api/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    contacts = contacts.filter((c) => c.id !== contactId);
    res.sendStatus(204);
    // Success response with status 204 (No Content)
  } else {
    res.status(404).json({ error: "Contact not found" });
    // Response with status 404 (Not Found)
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
