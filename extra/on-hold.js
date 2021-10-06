function warningHandler(option, noEffectKeys, requiredKeys) {
  let [key, value] = option;
  noEffectKeys = noEffectKeys || [];
  requiredKeys = requiredKeys || [];

  if (value !== undefined) {
    // NO EFFECT
    noEffectKeys.forEach((neKey) => {
      if (options[neKey]) {
        console.warn(
          `Redundant Declaration '${key}: ${value}': ${key} will have no effect because ${neKey} is set to '${options[neKey]}'.`
        );
      }
    });

    // REQUIRED
    requiredKeys.forEach((rKey) => {
      if (options[rKey] === "none") {
        // Nav Direction NONE
        console.warn(
          `Redundant Declaration '${key}: ${value}': ${key} TRUE is required because ${rKey} is set to '${options[rKey]}'.`
        );
      } else if (options[rKey]) {
        // TRUE
        console.warn(
          `Redundant Declaration '${key}: ${value}': ${key} TRUE is required because ${rKey} is set to '${options[rKey]}'.`
        );
      } else if (!options[rKey]) {
        // FALSE
        console.warn(
          `Redundant Declaration '${key}: ${value}': ${key} FALSE is required because ${rKey} is set to '${options[rKey]}'.`
        );
      }
    });
  }
}
