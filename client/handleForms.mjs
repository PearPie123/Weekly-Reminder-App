function sendFormData(formId) {
  const form = document.getElementById(formId);
  const formData = [...new FormData(form)];
  let instanceEntries = formData.filter(entry => (entry[0].startsWith("instance")));

  console.log(instanceEntries);
  let instances = [];
  for(const entry of instanceEntries) {
    const entryNum = parseInt(entry[0].charAt(entry[0].length - 1))
    entry[0] = entry[0].slice(0, -1);//should work test later
    if(instances.length !== entryNum) {
      let newInstance = [];
      newInstance.push(entry);
      instances.push(newInstance);
    }
    else if(instances.length === entryNum) {
      instances[entryNum - 1].push(entry);
    }
  }
  console.log(instances)
  const instancesObj = instances.map((instanceArr) => {
    const obj = Object.fromEntries(instanceArr);
    return obj;
  });

  const reminderDataOnly = formData.filter(entry => !(entry[0].startsWith("instance")));
  let completeReminderObj = Object.fromEntries(reminderDataOnly);
  completeReminderObj.instances = instancesObj;
  console.log(completeReminderObj);
  if(localStorage.getItem("remindersData") === null) {
    localStorage.setItem("remindersData", "[]");
  }
  let remindersArr = JSON.parse(localStorage.getItem("remindersData"));
  let reminderInExistence = false; 
  for(const reminder of remindersArr) {
    if(reminder.reminderName === completeReminderObj.reminderName) {
      const reminderIndex = remindersArr.indexOf(reminder);
      remindersArr[reminderIndex] = completeReminderObj;
      reminderInExistence = true;
    }
  }

  if(!reminderInExistence) {
    remindersArr.push(completeReminderObj);
  }
  const reminderTimeoutIds = JSON.parse(localStorage.getItem("reminderTimeoutIds"));
  if(!reminderTimeoutIds === null) {
    for(const timeout of reminderTimeoutIds) {
      clearTimeout(timeout);
    }
  }
  

  setReminders(remindersArr);
  localStorage.setItem("remindersData", JSON.stringify(remindersArr));
  
}

function setReminders(remindersArr) {
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
    const reminder = new ReoccuringReminder(reminderData.reminderName, reminderData.reminderMessage, reminderData.reminderType, convertedInstances);
  }
}

function prefillForm(reminderData) {
  const reminderNameInput = document.getElementById("reminderNameInput");
  const reminderMsgInput = document.getElementById("reminderMessage");
  const reminderTypeInput = document.getElementById("reminderTypeInput");
  reminderNameInput.value = reminderData.reminderName;
  reminderMsgInput.value = reminderData.reminderMessage;
  reminderTypeInput.value = reminderData.reminderType;
  document.getElementById("reminderInstancesList").innerHTML = "";
  for(const instance of reminderData.instances) {
    const instanceNum = document.getElementsByClassName("reminderInstanceContainer").length + 1;
    const reminderHtml = createReminderInstance(instanceNum, reminderData.reminderType, instance);
    document.getElementById("reminderInstancesList").appendChild(reminderHtml);
  }
  
}



