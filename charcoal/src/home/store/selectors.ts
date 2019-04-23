import { AppState } from "../../store";

export const getDrawerOpen = ({ home }: AppState) => home.drawerOpen;