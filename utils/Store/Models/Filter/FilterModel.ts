export interface FilterModel {
    pictures: "with_pictures" | "no_pictures" | "all_pictures",
    lamps: "with_lamps" | "no_lamps" | "all_lamps",
    type: "pole" | "lamp" | "both"
}