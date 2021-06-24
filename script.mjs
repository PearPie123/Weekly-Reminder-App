const tabSelectorBtns = document.getElementsByClassName("tabSelectBtn");
const btnToTabKey = {
  "todoTabBtn": "todoTab",
  "upcomingTabBtn": "upcomingTab",
  "recentTabBtn": "recentTab"
}
for(const btn of tabSelectorBtns) {
  const tabs = document.getElementsByClassName("tab");
  const correspondingTab = document.getElementById(btnToTabKey[btn.id]);
  btn.onclick = () => {
    selectTab(tabs, correspondingTab);
  }
}
const selectTab = (tabList, tab) => {
  for(const tabElem of tabList) {
    tabElem.classList.remove("activeTab");
    tabElem.classList.add("inactiveTab");
  }
  tab.classList.add("activeTab");
  tab.classList.remove("inactiveTab");
}