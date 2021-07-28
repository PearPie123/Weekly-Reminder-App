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
function selectTab(tabList, btnList, tab, btn) {
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
    else if(this.reoccurType === "weekly") {
      this.createWeeklyReminders();
      this.setReminderInterval = setInterval(1814000000, this.createWeeklyReminders);
    }
    else if(this.reoccurType === "monthly") {
      this.createMonthlyReminders();
      this.setReminderInterval = setInterval(1210000000, this.createMonthlyReminders);
    }
  }
  createReminders(periodLength) {
    const daysToSet = (periodLength === "daily")
      ? 24
      : (periodLength === "weekly")
      ? 21
      : 14;
    let stoppingDate = new Date();
    stoppingDate.setDate(stoppingDate.getDate() + daysToSet);
    let currentDate = new Date();
    while(currentDate < stoppingDate) {
      for(const instance of this.instances) {
        let copiedDate = new Date(currentDate.getTime());
        const isDaily = (periodLength === "daily");
        const isWeekly = (periodLength === "weekly");
        const isMonthly = (periodLength === "monthly");
        const isCorrectWeekday = (instance.weekDay === currentDate.getDay() + 1);
        const isCorrectMonthday = (instance.monthDay === currentDate.getDate());
        if ((isDaily) || (isWeekly && isCorrectWeekday) || (isMonthly && isCorrectMonthday)) {
          copiedDate.setHours(instance.hour);
          copiedDate.setMinutes(instance.minute);
          copiedDate.setSeconds(0);
          const reminder = new Reminder(copiedDate);
          this.reminderInstances.push(reminder);
        }
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