function sendFormData(formId) {
  const form = document.getElementById(formId);
  const formData = [...new FormData(form)];
  let instanceEntries = [];
  for(const entry of formData) {
    if(entry[0].startsWith("instance")) {
      instanceEntries.push(entry);
    }
  }

  let instances = [];
  for(const entry of instanceEntries) {
    const entryNum = parseInt(entry[0].charAt(entry[0].length - 1))
    if(instances.length !== entryNum) {
      let newInstance = [];
      newInstance.push(entry);
      instances.push(newInstance);
    }
    else if(instances.length === entryNum) {
      instances[entryNum - 1].push(entry);
    }
  }

  const instancesObj = instances.map((instanceArr) => {
    return Object.fromEntries(instanceArr);
  });

  const reminderDataOnly = formData.filter(entry => !(entry[0].startsWith("instance")));
  let completeReminderObj = Object.fromEntries(reminderDataOnly);
  completeReminderObj.instances = instancesObj;
  console.log(completeReminderObj);
  if(localStorage.getItem("remindersData") === null) {
    localStorage.setItem("remindersData", "[]");
  }
  const remindersArr = JSON.parse(localStorage.getItem("remindersData"));
  remindersArr.push(completeReminderObj);
  localStorage.setItem("remindersData", JSON.stringify(remindersArr));
  setReminders(JSON.stringify(remindersArr));
}

function setReminders(remindersJson) {
  const remindersArr = JSON.parse(remindersJson);
  for(const reminderData of remindersArr) {
    let convertedInstances = [];
    for(const instance of reminderData.instances) {
      let convertedInstance = {};
      for(const key in instance) {
        if(key.includes("Time")) {
          convertedInstance.hour = parseInt(instance[key].substr(0,2));
          convertedInstance.minute = parseInt(instance[key].substr(3,2));
        }
        else if(key.includes("Week")) {
          convertedInstance.weekDay = parseInt(instance[key]);
        }
        else {
          convertedInstance.monthDay = parseInt(instance[key]);
        }
      }
      convertedInstances.push(convertedInstance);
    }
    const reminder = new ReoccuringReminder(reminderData.reminderType, convertedInstances);
  }
}



