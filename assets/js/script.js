// Control elements in area
let areas = {
    a: null,
    b: null,
    c: null
};

/*=======================================================
 * EVENTS 
 * dragstart - start drag element
 * dragend
 =======================================================*/
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});


/*=======================================================
 * EVENTS
 * dragover - hover element dragable on top area drop-in
 * dragleave - leave the draggable area
 * drop - drop element in area
 =======================================================*/
document.querySelectorAll(".area").forEach(area => {
    area.addEventListener("dragover", dragOver);
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", drop);
});

document.querySelectorAll(".neutralArea").forEach(area => {
    area.addEventListener("dragover", dragOverNeutral);
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", dropNeutral);
});

/*=======================================================
 * FUNCTIONS ITEMS DRAG 
 =======================================================*/
function dragStart(event) {
    event.currentTarget.classList.add("dragging");
}

function dragEnd(event) {
    event.currentTarget.classList.remove("dragging");
}

/*=======================================================
 * FUNCTIONS AREA DROP
 =======================================================*/
function dragOver(event) {
    if(!event.currentTarget.querySelector(".item")) {
        event.preventDefault(); // liberate element draggable in area
        event.currentTarget.classList.add("hover");
    }
}

function dragLeave(event) {
    event.currentTarget.classList.remove("hover");
}

function drop(event) {
    event.currentTarget.classList.remove("hover");

    if(!event.currentTarget.querySelector(".item"))
        moveItem(event);
}

function moveItem(event) {
    // select item being dragged
    const dragItem = document.querySelector(".item.dragging");
    // Insert item in area dragged
    event.currentTarget.appendChild(dragItem);
    updateAreas();
}

/*=======================================================
 * FUNCTIONS NEUTRAL AREA
 =======================================================*/
function dragOverNeutral(event) {
    event.preventDefault();
    event.currentTarget.classList.add("hover");
}

function dropNeutral(event) {
    event.currentTarget.classList.remove("hover");
    moveItem(event);
}

/*=======================================================
 * LOGIC FUNCTIONS
 =======================================================*/
function updateAreas() {
    document.querySelectorAll(".area").forEach(area => {
        let name = area.getAttribute("data-name");

        if(area.querySelector(".item")) {
            areas[name] = area.querySelector(".item").innerHTML;
            return;
        }

        areas[name] = null;
    });

    (areas.a === '1' && areas.b === '2' && areas.c === "3") ? 
    document.querySelector(".areas").classList.add("correct") :
    document.querySelector(".areas").classList.remove("correct");
}