export const obtenerAnchoLabel = (labels: string[], fontSize = "1rem"): string => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return "150px";

  context.font = `900 ${fontSize} sans-serif`;

  const anchoMaximo = Math.max(
    0,
    ...labels.map(label =>
      context.measureText(`${label}:`).width
    )
  );

  return `${Math.ceil(anchoMaximo)}px`;
};