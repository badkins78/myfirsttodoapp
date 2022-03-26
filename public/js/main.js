const deleteText = document.querySelector(".fa-trash");
const addText = document.querySelector(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteChore);
});

Array.from(addText).forEach((element) => {
  element.addEventListener("click", addWeekly);
});

async function deleteChore() {
  const cName = this.parentNode.childNodes[1].innerText;
  const wName = this.parentNode.childNodes[3].innerText;
  const sName = this.parentNode.childNodes[5].innerText;
  try {
    const response = await fetch("deleteChore", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choreName: cName,
        workerName: wName,
        supervisorName: sName,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addWeekly() {
  const cName = this.parentNode.childNodes[1].innerText;
  const wName = this.parentNode.childNodes[3].innerText;
  const sName = this.parentNode.childNodes[5].innerText;
  const tWeekly = Number(this.parentNode.childNodes[7].innerText);
  try {
    const response = await fetch("addWeekly", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choreName: cName,
        workerName: wName,
        supervisorName: sName,
        timesWeekly: tWeekly,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
