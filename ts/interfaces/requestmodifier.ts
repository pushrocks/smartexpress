export type TRequestModifier = <T>(responseArg: {
  headers: { [header: string]: string | string[] | undefined };
  path: string;
  requestContent: string;
  travelData?: T;
}) => Promise<{
  headers: { [header: string]: string | string[] | undefined };
  path: string;
  requestContent: string;
  travelData?: T;
}>;
