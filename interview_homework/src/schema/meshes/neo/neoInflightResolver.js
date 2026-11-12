const toFlat = (o) => {
  const approach = o.close_approach_data?.[0];
  return {
    id: o.id,
    name: o.name,
    isPotentiallyHazardousAsteroid: o.is_potentially_hazardous_asteroid,
    estimatedDiameterMinKm: o.estimated_diameter?.kilometers?.estimated_diameter_min,
    estimatedDiameterMaxKm: o.estimated_diameter?.kilometers?.estimated_diameter_max,
    closeApproachDate: approach?.close_approach_date,
    relativeVelocityKph: approach?.relative_velocity?.kilometers_per_hour,
    missDistanceKm: approach?.miss_distance?.kilometers,
  };
};

module.exports = {
  flattenNeo: (next) => async (root, args, context, info) => {
    const value =
      typeof next === 'function'
        ? await next(root, args, context, info)
        : root.near_earth_objects ?? root.nearEarthObjects;;
    return Object.values(value || {}).flat().map(toFlat);
  },
};