import apiClint from "@/lib/apiClint";
import { ICreateCategory } from "@/types";

export function createCategory(payload: ICreateCategory) {
  return apiClint("/categories", {
    method: "POST",
    body: payload,
  });
}

export function getAllCategories() {
  return apiClint("/categories", {
    method: "GET",
  });
}
