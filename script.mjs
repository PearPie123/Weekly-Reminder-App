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

[
  {
    hour: 16,
    minute: 34
  },
  {
    monthDay: 1,
    hour: 4,
    minute: 53
  },
  {
    weekDayday:3,
    hour: 17,
    minute: 35
  }
]
class ReoccuringReminder {
  constructor(reoccurType, instances) {
    this.creationDate = new Date();
    this.reoccurType = reoccurType;
    this.instances = instances;
    this.reminderInstances = [];
    this.setReiminderInterval;
    
    if(this.reoccurType === "daily") {
      this.createDailyReminders();
      this.setReminderInterval = setInterval(2074000000, this.createDailyReminders); //every 24 days
    }
  }

  createDailyReminders() {
    //set reminders for the next 24 days (settimeout limit is 24.8 days)
    let in24Days = new Date();
    in24Days.setDate(in24Days.getDate() + 24);
    let currentDate = new Date();
    while(currentDate < in24Days) {
      for(const instance of this.instances) {
        let copiedDate = new Date(currentDate.getTime());
        copiedDate.setHours(instance.hour);
        copiedDate.setMinutes(instance.minute);
        copiedDate.setSeconds(0);
        const reminder = new Reminder(copiedDate);
        this.reminderInstances.push(reminder);
      }
    currentDate.setDate(currentDate.getDate() + 1);
    }
    
  }
}

class Reminder {
  constructor(triggerDate) {
    this.triggerDate = triggerDate;
    this.creationDate = new Date();
    const milisecDifference = this.triggerDate.getTime() - this.creationDate.getTime();
    setTimeout(this.triggerReminder, milisecDifference, this.triggerDate);
  }

  triggerReminder(date) {
    console.log("Reminder Triggered!!!!", date)
  }

}