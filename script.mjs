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