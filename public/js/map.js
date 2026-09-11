document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv || !coordinates) return;

  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
    center: coordinates,
    zoom: 10,
  });

  new maplibregl.Marker({ color: "red" }).setLngLat(coordinates).addTo(map);
});