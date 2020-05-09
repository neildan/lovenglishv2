/**
 * Cuando se cargue todo el HTML incluidos los audios, se activa la funcionalidad de buscar
 * Funciona con SessionStorage para saber que en que secciones de audios buscar (Separados por libros)
 * @author Daniel Valencia <08-05-2020>
 */
$(document).ready(function () {
  if (sessionStorage.filterInput && sessionStorage.filterInput != '') {
    $("#buscador_gb").val(sessionStorage.filterInput)
  }
  paintFilters()
  hideUnCheckedFilters()
  filterAudios()
});

var filtersBase = ["book-1", "book-2", "book-3"];

/**
 * Agregar filtro
 * @param String idButton
 * @author Daniel Valencia <08-05-2020>
 */
function addFilter(idButton) {
  var filters = [];
  var positionFilter = null;

  // En caso de que haya algún filtro
  if (sessionStorage.filters && sessionStorage.filters != '[]' && sessionStorage.filters != '') {
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
  var nameClassNoStyle = "boton-filter-no-selected";

  // Buscar los filtros en variable session
  if (sessionStorage.filters && sessionStorage.filters != '[]' && sessionStorage.filters != '') {
    filters = JSON.parse(sessionStorage.filters);

    // Se recorre los 3 botones,
    // Si está en filter, significa que toca pintarlo.
    // Sino lo está entonces toca quitarle el estilo
    filtersBase.forEach(element => {
      if (filters.indexOf(element) != -1) {
        element = $("#" + element);
        // Si el botón no tiene la clase, entonces se agrega el estilo
        if (!element.hasClass(nameClassStyle)) {
          if (element.hasClass(nameClassNoStyle)) {
            element.removeClass(nameClassNoStyle);
          }
          element.addClass(nameClassStyle);
        }
      } else {
        element = $("#" + element);
        if (element.hasClass(nameClassStyle)) {
          if (!element.hasClass(nameClassNoStyle)) {
            element.addClass(nameClassNoStyle);
          }
          element.removeClass(nameClassStyle);
        }
      }
    });

    // Si no hay variables de session ,
    // entonces quitar clase pintado a todos los botones
  } else {
    filtersBase.forEach((element) => {
      element = $("#" + element);
      if (element.hasClass(nameClassStyle)) {
        if (!element.hasClass(nameClassNoStyle)) {
          element.addClass(nameClassNoStyle);
        }
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
  var divCollapses = "id-collapse-";
  var classShow = "show";

  // Si hay filtros
  if (sessionStorage.filters && sessionStorage.filters != '[]' && sessionStorage.filters != '') {
    var filters = []
    var filters = JSON.parse(sessionStorage.filters);
    filtersBase.forEach((element) => {
      /**
       * Se busca en 'filters', cada una de las posiciones de filtersBase
       * Si 'filters' no encuentra por ejemplo 'book-2' dentro de sus posiciones,
       * Significa que se tiene que ocultar ese div porque no está seleccioado en los filtros
       */

      if (filters.indexOf(element) == -1) {
        $("#audios-" + element).hide();
        element = $("#" + divCollapses + element);
        if (element.hasClass(classShow)) {
          element.removeClass(classShow);
        }
      } else {
        $("#audios-" + element).show();
        element = $("#" + divCollapses + element);
        if (!element.hasClass(classShow)) {
          element.addClass(classShow);
        }
      }
    });
  } else {
    filtersBase.forEach((element) => {
      $("#audios-" + element).show();
    });
  }
}

/**
 * Filtrar Audios
 * @author Daniel Valencia <09-05-2020>
 */
function filterAudios() {
  var item = "";
  var searching = $("#buscador_gb").val();
  var audioNames = $(".nombre-audio");

  if (sessionStorage.filterInput != searching) {
    sessionStorage.filterInput = searching
  }

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
}
