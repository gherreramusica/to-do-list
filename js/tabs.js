// Selecciona todas las pestañas y el contenido de las pestañas
let tabs = document.querySelectorAll('.tab');
let tabContents = document.querySelectorAll('.tab-content');

// Itera sobre cada pestaña para agregar el evento de clic
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remueve la clase 'active' de todas las pestañas y oculta su contenido
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(content => (content.style.display = 'none'));

    // Agrega la clase 'active' a la pestaña seleccionada
    tab.classList.add('active');

    // Muestra el contenido correspondiente usando data-target
    const targetId = tab.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.style.display = 'block';
    }
  });
});







