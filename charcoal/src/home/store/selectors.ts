import { HomeState } from "./state";

export const getDrawerOpen = ({ home }: { home: HomeState }) => home.drawerOpen;