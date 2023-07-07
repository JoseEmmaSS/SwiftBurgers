function obtenerIdInventarioDeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const idInventario = urlParams.get('idInventario');
    return idInventario;
  }
  
  // Obtener el ID del inventario desde la URL
  const idInventario = obtenerIdInventarioDeURL();
  
  // Hacer lo que necesites con el ID del inventario
  console.log("ID del inventario:", idInventario);
  