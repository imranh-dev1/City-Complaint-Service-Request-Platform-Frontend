import apiClint from "@/lib/apiClint";

export function getAllCategories() {
  return apiClint("/categories", {
    method: "GET",
  });
}
