function setTabBtnHandlers() {
  const tabSelectorBtns = document.getElementsByClassName("tabSelectorBtn");
  const btnToTabIdKey = {
    "viewRemindersTabBtn": "viewRemindersTab",
    "createReminderBtn": "createReminderTab"
  }
  for(const btn of tabSelectorBtns) {
    const tabs = document.getElementsByClassName("tab");
    const correspondingTab = document.getElementById(btnToTabIdKey[btn.id]);
    btn.addEventListener("click", () => {
      selectTab(tabs, tabSelectorBtns, correspondingTab, btn);
      
    }); 
  }
}

function selectTab(tabList, btnList, selectedTab, selectedTabBtn) {
  for(const tab of tabList) {
    tab.classList.replace("activeTab", "hidden");
  }
  selectedTab.classList.replace("hidden", "activeTab");

  for(const btn of btnList) {
    btn.classList.replace("activeTabBtn", "inactiveTabBtn");
  }
  selectedTabBtn.classList.replace("inactiveTabBtn", "activeTabBtn");
}

function createReminderInstance(instanceNum, type, data) {
  const fragment = new DocumentFragment();
  const instanceContainer = document.createElement("div");
  instanceContainer.classList.add("reminderInstanceContainer", "shownInstance");
  

  const monthDayLabel = document.createElement("label");
  monthDayLabel.classList.add("instanceInputLabel", "instanceDayPicker")
  instanceContainer.appendChild(monthDayLabel);
  monthDayLabel.textContent = "Day of the month: ";
  const monthDayInput = document.createElement("input");
  monthDayLabel.appendChild(monthDayInput);
  monthDayInput.setAttribute("type", "number");
  monthDayInput.setAttribute("min", "1");
  monthDayInput.setAttribute("max", "31");
  monthDayInput.setAttribute("name", `instanceMonthDay${instanceNum}`);
  monthDayInput.classList.add("instanceInput");
  

  const weekDayLabel = document.createElement("label")
  weekDayLabel.classList.add("instanceInputLabel", "instanceDayPicker")
  instanceContainer.appendChild(weekDayLabel);
  weekDayLabel.textContent = "Day of the week: ";
  const weekDayInput = document.createElement("input");
  weekDayLabel.appendChild(weekDayInput);
  weekDayInput.setAttribute("type", "number");
  weekDayInput.setAttribute("min", "1");
  weekDayInput.setAttribute("max", "7");
  weekDayInput.setAttribute("name", `instanceWeekDay${instanceNum}`);
  weekDayInput.classList.add("instanceInput");

  
  
  const timeLabel = document.createElement("label");
  timeLabel.classList.add("instanceInputLabel", "instanceTimePicker")
  instanceContainer.appendChild(timeLabel);
  timeLabel.textContent = "Time: ";
  const timeInput = document.createElement("input");
  timeLabel.appendChild(timeInput);
  timeInput.setAttribute("type", "time");
  timeInput.setAttribute("name", `instanceTime${instanceNum}`);
  timeInput.classList.add("instanceInput");
  
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.setAttribute("id", "deleteInstanceBtn");
  deleteBtn.setAttribute("type", "button");
  const trashIcon = document.createElement("span");
  trashIcon.classList.add("material-icons");
  trashIcon.textContent = "clear";
  deleteBtn.addEventListener("click", () => {
    deleteElementAnim(instanceContainer);
  });
  deleteBtn.appendChild(trashIcon);
  instanceContainer.appendChild(deleteBtn);
  
  if(data !== undefined) {
    monthDayInput.value = data.instanceMonthDay;
    weekDayInput.value = data.instanceWeekDay;
    timeInput.value = data.instanceTime;
  }
  if(type === "daily"){
    monthDayLabel.classList.replace("instanceInputLabel", "hidden");
    weekDayLabel.classList.replace("instanceInputLabel", "hidden");
  }
  else if(type === "weekly"){
    monthDayLabel.classList.replace("instanceInputLabel", "hidden");
  }
  else if(type === "monthly") {
    weekDayLabel.classList.replace("instanceInputLabel", "hidden");
  }
  fragment.appendChild(instanceContainer);
  return fragment;
}

function deleteElementAnim (element) {
  element.classList.add("delete");
  setTimeout(() => {element.remove()}, 300);
}

function setReminderCreationBtns() {
  const addInstanceBtn = document.getElementById("newInstanceBtn");
  addInstanceBtn.addEventListener("click", () => {
      const instanceNum = document.getElementsByClassName("reminderInstanceContainer").length + 1;
      const reminderType = document.getElementById("reminderTypeInput").value;
      const instance = createReminderInstance(instanceNum, reminderType);
      const list = document.getElementById("reminderInstancesList")
      list.appendChild(instance);
      list.lastChild.scrollIntoView({behavior: "smooth", });
  });
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click",() => {
    sendFormData("createReminderForm");
    displayActiveReminders();
    const tabs = document.getElementsByClassName("tab");
    const tabSelectorBtns = 
    document.getElementsByClassName("tabSelectorBtn");
    const viewRemindersTab = document.getElementById("viewRemindersTab");
    const tabBtn = document.getElementById("viewRemindersTabBtn");
    selectTab(tabs, tabSelectorBtns, viewRemindersTab, tabBtn);
  });
  const reminderTypeInput = document.getElementById("reminderTypeInput");
  reminderTypeInput.addEventListener("change", () => {
    document.getElementById("reminderInstancesList").innerHTML = "";
  });
  const activeReminderTabBtn = document.getElementById("viewRemindersTabBtn");
  activeReminderTabBtn.addEventListener("click", () => {
    displayActiveReminders();
  });
}

function initCustomSelect() {
  const reminderSelect = document.getElementById("reminderTypeInput");
  customSelect(reminderSelect);
}

function init() {
  initCustomSelect();
  setReminderCreationBtns();
  setTabBtnHandlers();
  setReminders(JSON.parse(localStorage.getItem("remindersData")));
  displayActiveReminders();
}
init();