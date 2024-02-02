export function getSeriesAttributes(seriesName: string) {
    let color = "#000000"; // Default color
    let symbol = "circle"; // Default symbol

    if (seriesName === "Smartfren") {
        color = "#FD56D8";
        symbol = "diamond";
    } else if (seriesName === "Telkomsel") {
        color = "#e21542";
        symbol = "triangle";
    } else if (seriesName === "XL") {
        color = "#44adff";
        symbol = "square";
    } else if (seriesName === "Indosat Ooredoo + 3" || "Indosat") {
        color = "#f0cb01";
        symbol = "circle";
    }

    return {
        color,
        symbol
    };
}
  