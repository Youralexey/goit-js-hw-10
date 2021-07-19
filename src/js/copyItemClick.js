import { refs } from "./refs";
import { onChange } from "./onChange";

export const copyItemClick = e => {
    refs.searchBox.value = e.target.textContent;
    onChange(e);
}