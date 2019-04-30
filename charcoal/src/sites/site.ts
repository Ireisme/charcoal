import { Guid } from "guid-typescript";

export class Site {
  constructor(public ID: Guid, public Name: string, public ImageURL: string) {}
}