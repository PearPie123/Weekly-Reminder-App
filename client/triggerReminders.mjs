function sendNotification(reminderName, reminderMessage) {
  const notifOptions = {
      body: reminderMessage
    };
  if(Notification.permission === "granted") {
    const notification = new Notification(reminderName, notifOptions);
  }
  else if(Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if(permission === "granted") {
        const notification = new Notification(reminderName, notifOptions);
                
      }
    });
  }
}