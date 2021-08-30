function setTabBtnHandlers() {
  const tabSelectorBtns = document.getElementsByClassName("tabSelectorBtn");
  const btnToTabIdKey = {
    "todoTabBtn": "todoTab",
    "upcomingTabBtn": "upcomingTab",
    "viewRemindersTabBtn": "viewRemindersTab",
    "createReminderBtn": "createReminderTab"
  }
  for(const btn of tabSelectorBtns) {
    const tabs = document.getElementsByClassName("tab");
    const correspondingTab = document.getElementById(btnToTabIdKey[btn.id]);
    btn.onclick = () => {
      selectTab(tabs, tabSelectorBtns, correspondingTab, btn);
    }
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

function addReminderInstance() {
  const fragment = new DocumentFragment();
  const instanceContainer = document.createElement("div");
  const instanceNum = document.getElementsByClassName("reminderInstanceContainer").length + 1;
  const reminderType = document.getElementById("reminderTypeInput").value;
  instanceContainer.classList.add(`reminderInstanceContainer`);
  
  const monthDayContainer = document.createElement("div");
  monthDayContainer.classList.add
  instanceContainer.appendChild(monthDayContainer);
  const monthDayLabel = document.createElement("label");
  monthDayContainer.appendChild(monthDayLabel);
  monthDayLabel.textContent = "Day of the month: ";
  const monthDayInput = document.createElement("input");
  monthDayLabel.appendChild(monthDayInput);
  monthDayInput.setAttribute("type", "number");
  monthDayInput.setAttribute("min", "1");
  monthDayInput.setAttribute("max", "31");
  monthDayInput.setAttribute("name", `instanceMonthDay${instanceNum}`);

  const weekDayContainer = document.createElement("div");
  instanceContainer.appendChild(weekDayContainer);
  const weekDayLabel = document.createElement("label")
  weekDayContainer.appendChild(weekDayLabel);
  weekDayLabel.textContent = "Day of the week: ";
  const weekDayInput = document.createElement("input");
  weekDayLabel.appendChild(weekDayInput);
  weekDayInput.setAttribute("type", "number");
  weekDayInput.setAttribute("min", "1");
  weekDayInput.setAttribute("max", "7");
  weekDayInput.setAttribute("name", `instanceWeekDay${instanceNum}`);

  const timeContainer = document.createElement("div");
  instanceContainer.appendChild(timeContainer);
  const timeLabel = document.createElement("label");
  timeContainer.appendChild(timeLabel);
  timeLabel.textContent = "Time: ";
  const timeInput = document.createElement("input");
  timeLabel.appendChild(timeInput);
  timeInput.setAttribute("type", "time");
  timeInput.setAttribute("name", `instanceTime${instanceNum}`);
  
  if(reminderType === "daily"){
    monthDayContainer.classList.add("hidden");
    weekDayContainer.classList.add("hidden");
  }
  else if(reminderType === "weekly"){
    monthDayContainer.classList.add("hidden");
  }
  else if(reminderType === "monthly") {
    weekDayContainer.classList.add("hidden");
  }
  fragment.appendChild(instanceContainer);
  document.getElementById("reminderInstancesList").appendChild(fragment);
}


function setReminderCreationBtns() {
  const addInstanceBtn = document.getElementById("newInstanceBtn");
  addInstanceBtn.onclick = addReminderInstance;
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click",() => {sendFormData("createReminderForm")})
  const reminderTypeInput = document.getElementById("reminderTypeInput");
  reminderTypeInput.addEventListener("change", () => {
    document.getElementById("reminderInstancesList").innerHTML = "";
  });
}
function displayActiveReminders() {
  const displayTab = document.getElementById("viewRemindersTab");
  const reminderData = JSON.parse(localStorage.getItem("remindersData"));
  displayTab.innerHTML = "";
}
function createReminderDisplayElement(reminderType, reminder ) {
  const fragment = new DocumentFragment();
}
function init() {
  setReminderCreationBtns();
  setTabBtnHandlers();
}
init();