class ReoccuringReminder {
  constructor(reoccurType, instances) {
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
    if(milisecDifference > 0) {
      setTimeout(this.triggerReminder, milisecDifference, this.triggerDate);
    }
  }

  triggerReminder(date) {
    console.log("Reminder Triggered!!!!", date)
  }

}
