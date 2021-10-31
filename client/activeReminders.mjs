function displayActiveReminders() {
  const displayTab = document.getElementById("viewRemindersTab");
  displayTab.innerHTML = "";
  const reminderData = JSON.parse(localStorage.getItem("remindersData"));
  console.log(reminderData);
  if(reminderData === null) {
    return undefined;
  }
  for(const reminder of reminderData) {
    const reminderElem = createReminderDisplayElement(reminder);
    displayTab.appendChild(reminderElem);
  }
}
function createReminderDisplayElement(reminderData) {
  const fragment = new DocumentFragment();
  const container = document.createElement("div");
  container.classList.add("activeReminderContainer");
  const name = document.createElement("p");
  name.textContent = `Name: ${reminderData.reminderName}`;
  const message = document.createElement("p");
  message.textContent = `Message: ${reminderData.reminderMessage}`;
  const editReminderBtn = document.createElement("button");
  editReminderBtn.classList.add("editReminderBtn");
  editReminderBtn.textContent = "Edit and view reminder";
  editReminderBtn.classList.add("basicBtn");
  editReminderBtn.addEventListener("click", ()=> {
    prefillForm(reminderData);
    const tabs = document.getElementsByClassName("tab");
    const tabSelectorBtns = 
    document.getElementsByClassName("tabSelectorBtn");
    const createReminderTab = document.getElementById("createReminderTab");
    const tabBtn = document.getElementById("createReminderBtn");
    selectTab(tabs, tabSelectorBtns, createReminderTab, tabBtn);
  });
  const deleteReminderBtn = document.createElement("button");
  deleteReminderBtn.classList.add("basicBtn", "deleteBtn");
  const icon = document.createElement("span");
  icon.classList.add( "material-icons");
  icon.textContent = "clear";
  deleteReminderBtn.appendChild(icon);
  deleteReminderBtn.addEventListener("click", () => {
    console.log(reminderData);
    const remindersData = JSON.parse(localStorage.getItem("remindersData"));
    const deletedRemindersData = remindersData.filter((reminder) => {return reminder.reminderName !== reminderData.reminderName});
    localStorage.setItem("remindersData", JSON.stringify(deletedRemindersData));
    displayActiveReminders();
  });
  container.append(name, message, editReminderBtn, deleteReminderBtn);
  fragment.appendChild(container);
  return fragment;
}
