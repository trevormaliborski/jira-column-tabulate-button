/**
 * Button For Tabs script
 *
 * @author Trevor Maliborski
 */

// TODO: allow user to set max tabs
const MAX_TABS = 30;

const columnHeaderClassName = ".ghx-column-header-flex";
const columnHeaders = document.querySelectorAll(columnHeaderClassName);

function openJiras(e) {
  let currentNode = e.target;
  while (
    currentNode instanceof Element &&
    !currentNode.getAttribute("data-id")
  ) {
    currentNode = currentNode.parentNode;
  }

  if (
    !(currentNode instanceof Element) &&
    !currentNode.getAttribute("data-id")
  ) {
    console.error("This 'Open Top n Jiras' button was incorrectly positioned.");
  }

  const column = document.querySelector(
    `[data-column-id="${currentNode.getAttribute("data-id")}"]`
  );

  // the reference to the "firstChild" prop on the next line is needed to get past the swimlane wrapper.
  const jiraCards = column.firstChild.childNodes;
  for (let i = 0; i < MAX_TABS; i++) {
    let issueLink = jiraCards[i].querySelector(".ghx-key");
    if (issueLink.href) {
      window.open(issueLink.href, "_blank");
    }
  }
}

let button = document.createElement("button");
button.type = "button";
button.value = "Open Jiras";
button.onclick = openJiras;

columnHeaders.forEach((headerNode) => {
  let button = document.createElement("button");
  button.type = "button";

  // TODO: pull in the number of jiras in the current column
  // and then set the numerical value used in the next line
  // to min(numJirasInCol, MAX_TABS)
  button.innerText = `Open Top ${MAX_TABS} Jiras`;
  button.onclick = openJiras;

  button.className = "btn-secondary btn-sm";
  button.style.marginTop = "0.5em";

  headerNode.appendChild(button);
});
