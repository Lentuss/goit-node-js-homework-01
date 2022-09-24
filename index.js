const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const list = await listContacts();
        console.table(list);
        break;

      case "get":
        const contact = await getContactById(id);
        if (!contact) {
          throw new Error(`Contact ${id} not found`);
        }
        console.log(contact);
        break;

      case "add":
        const addedContact = await addContact(name, email, phone);
        if (!addedContact) {
          throw new Error("Contact not added");
        }
        console.log(addedContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        if (!removedContact) {
          throw new Error(`Contact with id ${id} not found`);
        }
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "11" });
// invokeAction({
//   action: "add",
//   name: "Peter Popandopulos",
//   email: "petya@gmail.com",
//   phone: "+380999999990",
// });
// invokeAction({ action: "remove", id: "acd2e46c-9dd7-48d1-bc71-25d6eab578d7" });

invokeAction(argv);
