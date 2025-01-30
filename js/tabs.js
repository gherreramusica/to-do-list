// Selecciona todas las pestañas y el contenido de las pestañas
let tabs = document.querySelectorAll('.tab');
let tabContents = document.querySelectorAll('.tab-content');


tabs.forEach((tab, index) => {

  tab.addEventListener('click', () => {
    //REMOVE ACTIVE CLASS
    tabs.forEach((tab) => tab.classList.remove('active') )

    tabContents.forEach((content) => content.classList.remove('active'));

    //ADD ACTIVE CLASS TO INDEX
    tab.classList.add('active');
    tabContents[index].classList.add('active');
  })

})









