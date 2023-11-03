const viewTest = document.querySelector('#subjects');// Grabbing subjects div
const modal = document.querySelector('#myModal'); //Grabbing modal element
const span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal

viewTest.onclick = e =>{
    console.log(e.target.parentElement)
    if(e.target.classList.contains('view-test-button'))
    modal.style.display = "block";
}; 

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}