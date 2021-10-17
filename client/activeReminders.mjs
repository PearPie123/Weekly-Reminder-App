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
  editReminderBtn.addEventListener("click", ()=> {
    prefillForm(reminderData);
    const tabs = document.getElementsByClassName("tab");
    const tabSelectorBtns = 
    document.getElementsByClassName("tabSelectorBtn");
    const createReminderTab = document.getElementById("createReminderTab");
    const tabBtn = document.getElementById("createReminderBtn");
    selectTab(tabs, tabSelectorBtns, createReminderTab, tabBtn);
  });
  container.append(name, message, editReminderBtn);
  fragment.appendChild(container);
  return fragment;
}
