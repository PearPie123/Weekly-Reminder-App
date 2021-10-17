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
  
  if(data !== undefined) {
    monthDayInput.value = data.instanceMonthDay;
    weekDayInput.value = data.instanceWeekDay;
    timeInput.value = data.instanceTime;
  }
  if(type === "daily"){
    monthDayContainer.classList.add("hidden");
    weekDayContainer.classList.add("hidden");
  }
  else if(type === "weekly"){
    monthDayContainer.classList.add("hidden");
  }
  else if(type === "monthly") {
    weekDayContainer.classList.add("hidden");
  }
  fragment.appendChild(instanceContainer);
  return fragment;
}


function setReminderCreationBtns() {
  const addInstanceBtn = document.getElementById("newInstanceBtn");
  addInstanceBtn.addEventListener("click", () => {
      const instanceNum = document.getElementsByClassName("reminderInstanceContainer").length + 1;
      const reminderType = document.getElementById("reminderTypeInput").value;
      const instance = createReminderInstance(instanceNum, reminderType);
      document.getElementById("reminderInstancesList").appendChild(instance);
  });
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click",() => {sendFormData("createReminderForm")})
  const reminderTypeInput = document.getElementById("reminderTypeInput");
  reminderTypeInput.addEventListener("change", () => {
    document.getElementById("reminderInstancesList").innerHTML = "";
  });
  const activeReminderTabBtn = document.getElementById("viewRemindersTabBtn");
  activeReminderTabBtn.addEventListener("click", () => {
    displayActiveReminders();
  });
}


function init() {
  setReminderCreationBtns();
  setTabBtnHandlers();
}
init();