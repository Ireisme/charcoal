import { Guid } from "guid-typescript";

export class Trench {
  constructor(public ID: Guid, public SiteID: Guid, public Name: string) {}
}