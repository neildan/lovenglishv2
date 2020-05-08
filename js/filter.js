/**
 * Cuando se cargue todo el HTML incluidos los audios, se activa la funcionalidad de buscar
 * Funciona con SessionStorage para saber que en que secciones de audios buscar (Separados por libros)
 * @author Daniel Valencia <08-05-2020>
 */
$(document).ready(function () {
  paintFilters();
});

/**
 * Agregar filtro
 * @param String idButton
 * @author Daniel Valencia <08-05-2020>
 */
function addFilter(idButton) {
  var filters = [];
  var positionFilter = null;

  // En caso de que haya algún filtro
  if (sessionStorage.filters) {
    filters = JSON.parse(sessionStorage.filters);
    var positionFilter = filters.indexOf(idButton);

    // En caso de que toque desmarcar
    if (positionFilter != -1) {
      filters.splice(positionFilter, 1);
    } else {
      filters.push(idButton);
    }
  } else {
    filters.push(idButton);
  }

  sessionStorage.setItem("filters", JSON.stringify(filters));

  paintFilters();
  hideUnCheckedFilters();
}

/**
 * Pintar los botone seleccionados o
 * Quitar estilo a los botones que ya no están seleccionados
 * @author Daniel Valencia <08-05-2020>
 */
function paintFilters() {
  var filters = [];
  var nameClassStyle = "boton-filter-selected";

  if (sessionStorage.filters) {
    filters = JSON.parse(sessionStorage.filters);

    filters.forEach((element) => {
      element = $("#" + element);
      if (!element.hasClass(nameClassStyle)) {
        element.addClass(nameClassStyle);
      }
    });
  } else {
    filters = ["book-1", "book-2", "book-3"];

    filters.forEach((element) => {
      element = $("#" + element);
      if (element.hasClass(nameClassStyle)) {
        element.removeClass(nameClassStyle);
      }
    });
  }
}

/**
 * Ocultar las secciones de audios que no esten incluidos en los filtros
 * @author Daniel Valencia <08-05-2020>
 */
function hideUnCheckedFilters() {
  // Si hay filtros
  if (sessionStorage.filters) {
    var filters = [],
      filtersBase = ["book-1", "book-2", "book-3"];
    filters = JSON.parse(sessionStorage.filters);
    filtersBase.forEach((element) => {
      /**
       * Se busca en 'filters', cada una de las posiciones de filtersBase
       * Si 'filters' no encuentra por ejemplo 'book-2' dentro de sus posiciones,
       * Significa que se tiene que ocultar ese div porque no está seleccioado en los filtros
       */

      if (filters.indexOf(element) == -1) $("#audios-" + element).hide();
    });
  }
}

/**
 * Cada vez que se escriba una letra en el buscador, este filtrará
 * @author Daniel Valencia <08-05-2020>
 */
$("#buscador_gb").keyup(function () {
  var item = "";
  var searching = $(this).val();
  var audioNames = $(".nombre-audio");

  for (var i = 0; i < audioNames.length; i++) {
    item = $(audioNames[i]).html().toLowerCase();
    for (var x = 0; x < item.length; x++) {
      if (searching.length == 0 || item.indexOf(searching) > -1) {
        $(audioNames[i]).parents(".item").show();
      } else {
        $(audioNames[i]).parents(".item").hide();
      }
    }
  }
});
