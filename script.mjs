const tabSelectorBtns = document.getElementsByClassName("tabSelectorBtn");
const btnToTabKey = {
  "todoTabBtn": "todoTab",
  "upcomingTabBtn": "upcomingTab",
  "recentTabBtn": "recentTab"
}
for(const btn of tabSelectorBtns) {
  const tabs = document.getElementsByClassName("tab");
  const correspondingTab = document.getElementById(btnToTabKey[btn.id]);
  btn.onclick = () => {
    selectTab(tabs, tabSelectorBtns, correspondingTab, btn);
  }
}
const selectTab = (tabList, btnList, tab, btn) => {
  for(const tabElem of tabList) {
    tabElem.classList.remove("activeTab");
    tabElem.classList.add("inactiveTab");
  }
  tab.classList.add("activeTab");
  tab.classList.remove("inactiveTab");
  for(const btnElem of btnList) {
    btnElem.classList.remove("activeTabBtn");
    btnElem.classList.add("inactiveTabBtn");
  }
  btn.classList.add("activeTabBtn");
  btn.classList.remove("inactiveTabBtn");
}
class ReoccuringReminder {
  constructor() {
    
  }
}
class Reminder {
  constructor(triggerDate) {
    this.triggerDate = triggerDate;
    this.creationDate = new Date();
    const milisecDifference = triggerDate.getTime() - this.creationDate.getTime();
    setTimeout(this.triggerReminder, milisecDifference);
  }

  triggerReminder() {
    alert("Reminder Triggered!!!!")
  }

}
// can be daily monthly or weekly
// has a date var that is when it should trigger
// can be set to happen again
// class Reminder {
//   constructor(triggerDate) {
//     this.triggerDate = triggerDate;
//     this.isUpcoming(this.triggerDate);
//     const interval = setInterval(this.isUpcoming, 60000, this.triggerDate);
//   }

//   isUpcoming(triggerDate) {
//     const now = Date.now();
//     const milisecDifference = triggerDate.getTime() - now;
//     if(milisecDifference <= 300000) {
//       this.prepareTrigger(milisecDifference);
//       return true;
//     }
//   }

//   prepareTrigger(timeTillTrigger) {
//     setTimeout(this.triggerReminder, timeTillTrigger);
//   }

//   triggerReminder() {
//     alert("Reminder Triggered!!!!")
//   }

// }