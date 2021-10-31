class ReoccuringReminder {
  constructor(name, message, reoccurType, instances) {
    this.name = name;
    this.message = message;
    this.creationDate = new Date();
    this.reoccurType = reoccurType;
    this.instances = instances;
    this.reminderInstances = [];
    this.setReiminderInterval;
    this.createReminders(reoccurType);

    if(this.reoccurType === "daily") {
      this.setReminderInterval = setInterval(2074000000, this.createReminders, reoccurType); //every 24 days
    }
    else if(this.reoccurType === "weekly") {
      this.setReminderInterval = setInterval(1814000000, this.createReminders, reoccurType);
    }
    else if(this.reoccurType === "monthly") {
      this.setReminderInterval = setInterval(1210000000, this.createReminders, reoccurType);
    }
    this.storeTimeoutIds();
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
          console.log(this.name, this.message);
          const reminder = new Reminder(copiedDate, this.name, this.message);
          this.reminderInstances.push(reminder);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.storeTimeoutIds();
  }
  
  storeTimeoutIds() {
    let timeouts = [];
    timeouts.push(this.setReminderInterval);
    for(const reminder of this.reminderInstances) {
      timeouts.push(reminder.timeout);
    }
    timeouts = timeouts.filter((timeout) => {
      return timeout !== undefined;
    });
    console.log("ids", timeouts)
    localStorage.setItem("reminderTimeoutIds",JSON.stringify(timeouts))
  }

  clear() {
    for(const reminder of this.reminderInstances){
      reminder.clearTimeout();
    }
    clearInterval(this.setReminderInterval);
  }
}

class Reminder {
  constructor(triggerDate, parentReminderName, parentReminderMessage) {
    this.parentReminderName = parentReminderName;
    this.parentReminderMessage = parentReminderMessage;
    this.triggerDate = triggerDate;
    this.creationDate = new Date();
    const milisecDifference = this.triggerDate.getTime() - this.creationDate.getTime();
    if(milisecDifference > 0) {
      this.timeout = setTimeout(() => {this.triggerReminder(this.triggerDate)}, milisecDifference);
    }
  }
  
  clearReminder() {
    clearTimeout(this.timeout);
  }

  triggerReminder(date) {
    sendNotification(this.parentReminderName, this.parentReminderMessage);
  }

}
